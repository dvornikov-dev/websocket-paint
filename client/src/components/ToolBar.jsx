import toolState from '../store/toolState';
import canvasState from '../store/canvasState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import { useState, useEffect } from 'react';
import './../styles/toolbar.scss';

const ToolBar = () => {

    const [color, setColor] = useState('#000000');


    useEffect(() =>{
        toolState.setFillColor(color);
        toolState.setStrokeColor(color);
    }, [color]);

    const onChangeColor = (e) => {
        setColor(e.target.value);
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = canvasState.id + '.jpg';
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
    }

    const undo = () => {
        canvasState.ws.send(JSON.stringify({
            method: 'undo',
            id: canvasState.id,
        }));
    }

    const redo = () => {
        canvasState.ws.send(JSON.stringify({
            method: 'redo',
            id: canvasState.id,
        }));
    }

    return (
        <div className='__btn toolbar'>
            <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.ws, canvasState.id))}/>
            <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.ws, canvasState.id))}/>
            <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.ws, canvasState.id))}/>
            <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.ws, canvasState.id))}/>
            <button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.ws, canvasState.id))}/>
            <input type="color" defaultValue={color} onChange={onChangeColor}/>
            <button className='toolbar__btn undo' onClick={undo}/>
            <button className='toolbar__btn redo' onClick={redo}/>
            <button className='toolbar__btn save' onClick={download}/>
        </div>
    );
}

export default ToolBar;