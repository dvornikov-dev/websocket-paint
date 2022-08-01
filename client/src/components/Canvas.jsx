import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import canvasService from './../services/canvasService';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import ModalForm from './ModalFrom';
import Brush from '../tools/Brush';
import './../styles/canvas.scss';

const Canvas = observer(() => {

    const [username, setUsername] = useState(false);

    const canvasRef = useRef();

    const { id } = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);

        const ctx = canvasRef.current.getContext('2d');
        canvasService.getCanvas(ctx, id, canvasRef.current.width, canvasRef.current.height);
    }, []);

    useEffect(() => {
        canvasState.setUsername(username);

        if(canvasState.username) {
            
            const ctx = canvasRef.current.getContext('2d');
            canvasService.getCanvas(ctx, id, canvasRef.current.width, canvasRef.current.height);

            const ws = new WebSocket('ws://localhost:5000/');
            toolState.setTool(new Brush(canvasRef.current, ws, id));
            canvasState.setWs(ws);
            canvasState.setId(id);
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    username: canvasState.username,
                    id: id,
                    method: 'connection',
                }));
            }

            ws.onmessage = (msg) => canvasService.onmessage(msg, ctx, canvasState, toolState);
        }
    }, [username]);

    const onMouseUp = e => canvasService.setCanvas(id, canvasRef.current.toDataURL())

    const onMouseDown = e => {
        canvasState.ws.send(JSON.stringify({
            method: 'pushToUndoList',
            id: canvasState.id,
            dataUrl: canvasRef.current.toDataURL(),
        }));
    };

    return (
        <div className="canvas">
            <ModalForm setUsername={setUsername}/>
            <canvas onMouseUp={onMouseUp} onMouseDown={onMouseDown} ref={canvasRef}  width={600} height={400}></canvas>
        </div>
    );
});

export default Canvas;