import { makeAutoObservable } from "mobx";
class CanvasState {
    canvas = null;
    ws = null;
    id = null;
    undoList = [];
    redoList = [];
    
    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    setWs(ws) {
        this.ws = ws;
    }

    setId(id) {
        this.id = id;
    }

    setUsername(username) {
        this.username = username;
    }

    pushToUndoList(undo) {
        this.undoList.push(undo);
    }

    pushToRedoList(redo) {
        this.redoList.push(redo);
    }

    undo() {
        if(this.undoList.length > 0) {
            const dataUrl = this.undoList.pop();
            this.pushToRedoList(this.canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }

    redo() {
        if(this.redoList.length > 0) {
            const dataUrl = this.redoList.pop();
            this.pushToUndoList(this.canvas.toDataURL());
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

export default new CanvasState();