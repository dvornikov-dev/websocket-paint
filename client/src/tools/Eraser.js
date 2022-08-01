import Tool from './Tool.js';
import toolState from './../store/toolState';

export default class Eraser extends Tool {
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
        if (!this.mouseDown) {
            const x = event.pageX - event.target.offsetLeft;
            const y = event.pageY - event.target.offsetTop;
            this.ctx.beginPath();
            this.ctx.moveTo(x,y);
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
                    type: 'eraser',
                    x: event.pageX - event.target.offsetLeft,
                    y: event.pageY - event.target.offsetTop,
                    lineWidth: toolState.lineWidth,
                }
            })); 
        }
    }

    static serverDraw(ctx, figure) {
        ctx.lineWidth = figure.lineWidth;
        ctx.strokeStyle = 'white';
        ctx.lineTo(figure.x, figure.y);
        ctx.stroke();
    }
}