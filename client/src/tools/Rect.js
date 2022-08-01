import Tool from './Tool.js';
import toolState from './../store/toolState';

export default class Rect extends Tool {

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
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                fillColor: toolState.fillColor,
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
            this.width = event.pageX - event.target.offsetLeft - this.startX;
            this.height = event.pageY - event.target.offsetTop - this.startY;
            this.clientDraw(this.startX, this.startY, this.width, this.height);
        }
    }

    clientDraw(x, y, width, height) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x, y, width, height);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    static serverDraw(ctx, figure) {
        ctx.fillStyle = figure.fillColor;
        ctx.strokeStyle = figure.strokeColor;
        ctx.lineWidth = figure.lineWidth;
        ctx.beginPath();
        ctx.rect(figure.x, figure.y, figure.width, figure.height);
        ctx.fill();
        ctx.stroke();
    }
}