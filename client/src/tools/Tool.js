export default class Tool {
    constructor(canvas, ws, id) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ws = ws;
        this.id = id;
        this.destroyEvents();
    }

    destroyEvents() {
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.canvas.onmousemove = null;
    }

    set lineWidth(lineWidth) {
        this.ctx.lineWidth = lineWidth;
    }

    set fillColor(color) {
        this.ctx.fillStyle = color;
    }

    get fillColor() {
        return this.ctx.fillStyle;
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color;
    }

    get strokeColor() {
        return this.ctx.strokeStyle;
    }
}