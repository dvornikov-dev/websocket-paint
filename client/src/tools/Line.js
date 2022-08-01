import Tool from './Tool.js';
import toolState from './../store/toolState';

export default class Line extends Tool {
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
            this.startX = event.pageX - event.target.offsetLeft;
            this.startY = event.pageY - event.target.offsetTop;
            this.saved = this.canvas.toDataURL();
        }
        this.mouseDown = true;
    }

    onMouseUp(event) {
        this.mouseDown = false;
        this.ws.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                startX: this.startX,
                startY: this.startY,
                x: this.x,
                y: this.y,
                strokeColor: toolState.strokeColor,
                lineWidth: toolState.lineWidth,
            }
        })); 
        this.ws.send(JSON.stringify({
            method: 'finish',
            id: this.id,
        }));
    }

    onMouseMove(event) {
        if(this.mouseDown) {
            this.x = event.pageX - event.target.offsetLeft;
            this.y = event.pageY - event.target.offsetTop;
            this.clientDraw(this.x, this.y);
        }
    }

    clientDraw(x, y) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }

    static serverDraw(ctx, figure) {
        ctx.strokeStyle = figure.strokeColor;
        ctx.lineWidth = figure.lineWidth;
        ctx.beginPath();
        ctx.moveTo(figure.startX, figure.startY);
        ctx.lineTo(figure.x, figure.y);
        ctx.stroke();
    }
}