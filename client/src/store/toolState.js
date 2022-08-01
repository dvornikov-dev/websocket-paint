import { makeAutoObservable } from "mobx";

class ToolState {

    tool = null;
    fillColor = null;
    strokeColor = null;
    lineWidth = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        if(this.tool) {
            this.tool.lineWidth = lineWidth;
        }
    }

    setFillColor(color) {
        this.fillColor = color;
        if(this.tool) {
            this.tool.fillColor = color;
        }
    }

    setStrokeColor(color) {
        this.strokeColor = color;
        if(this.tool) {
            this.tool.strokeColor = color;
        }
    }
}

export default new ToolState();