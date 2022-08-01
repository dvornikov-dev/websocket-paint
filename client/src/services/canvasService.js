import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import axios from 'axios';
class СanvasService {

    drawHandler = (msg, ctx, toolState) => {
        const figure = msg.figure;
        // eslint-disable-next-line default-case
        switch(figure.type) {
            case 'brush':
                Brush.serverDraw(ctx, figure);
                break;
            case 'rect':
                Rect.serverDraw(ctx, figure);
                break;    
            case 'circle':
                Circle.serverDraw(ctx, figure);
                break;
            case 'line':
                Line.serverDraw(ctx, figure);
                break;
            case 'eraser':
                Eraser.serverDraw(ctx, figure);
                break;    
        }

        ctx.fillStyle = toolState.fillColor;
        ctx.strokeStyle = toolState.strokeColor;
        ctx.lineWidth = toolState.lineWidth;
    }

    onmessage = (msg, ctx, canvasState, toolState) => {
        msg = JSON.parse(msg.data);
        // eslint-disable-next-line default-case
        switch(msg.method) {
            case 'connection':
                console.log(`User ${msg.username} connected`);
                break;
            case 'start':
                ctx.beginPath();
                ctx.moveTo(msg.start.x,msg.start.y);
                break;    
            case 'draw':
                this.drawHandler(msg, ctx, toolState);
                break;
            case 'finish':
                ctx.beginPath();
                break;
            case 'pushToUndoList':
                canvasState.pushToUndoList(msg.dataUrl);
                break;
            case 'undo':
                canvasState.undo();
                break;
            case 'redo':
                canvasState.redo();
                break;        
        }
    }

    getCanvas = (ctx, id, width, height) => {
        axios.get('http://localhost:5000/image?id=' + id).then(response => {
            if(response.data.status) {
                const img = new Image();
                img.src = response.data.image;
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.stroke();
                }
            }
        });
    }

    setCanvas = (id, img) => {
        axios.post('http://localhost:5000/image?id=' + id, { img });
    }
}

export default new СanvasService();