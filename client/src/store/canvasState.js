import { makeAutoObservable } from "mobx";
import canvasService from "../services/canvasService";

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
            canvasService.setImage(dataUrl, this.ctx, this.canvas.width, this.canvas.height);
        }
    }

    redo() {
        if(this.redoList.length > 0) {
            const dataUrl = this.redoList.pop();
            this.pushToUndoList(this.canvas.toDataURL());
            canvasService.setImage(dataUrl, this.ctx, this.canvas.width, this.canvas.height);
        }
    }
}

export default new CanvasState();