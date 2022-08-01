import Tool from './Tool.js';
import toolState from './../store/toolState';

export default class Brush extends Tool {
    constructor(canvas, ws, id) {
        super(canvas, ws, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.onMouseDown.bind(this);
        this.canvas.onmousemove = this.onMouseMove.bind(this);
        this.canvas.onmouseup = this.onMouseUp.bind(this);
    }

    onMouseDown(event) {
        if(!this.mouseDown) {
            const x = event.pageX - event.target.offsetLeft;
            const y = event.pageY - event.target.offsetTop;
            this.ws.send(JSON.stringify({
                method: 'start',
                id: this.id,
                start: {
                    x,
                    y
                }
            }));
        }
        this.mouseDown = true;
    }

    onMouseUp(event) {
        this.mouseDown = false;
        this.ws.send(JSON.stringify({
            method: 'finish',
            id: this.id,
        }));
    }

    onMouseMove(event) {
        if(this.mouseDown) {
            this.ws.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: event.pageX - event.target.offsetLeft,
                    y: event.pageY - event.target.offsetTop,
                    strokeColor: toolState.strokeColor,
                    lineWidth: toolState.lineWidth,
                }
            }));
        }
    }

    static serverDraw(ctx, figure) {
        ctx.strokeStyle = figure.strokeColor;
        ctx.lineWidth = figure.lineWidth;
        ctx.lineTo(figure.x, figure.y);
        ctx.stroke();
    }
}