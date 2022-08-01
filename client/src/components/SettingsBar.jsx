import toolState from '../store/toolState';
import { useEffect, useState } from 'react';
import './../styles/toolbar.scss';

const SettingsBar = () => {

    const [strokeColor, setStrokeColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(1);


    useEffect(() =>{
        toolState.setStrokeColor(strokeColor);
    }, [strokeColor]);

    useEffect(() =>{
        toolState.setLineWidth(lineWidth);
    }, [lineWidth]);

    const onChangeColor = (e) => {
        setStrokeColor(e.target.value);
    }

    const onChangeLineWidth = (e) => {
        setLineWidth(e.target.value);
    }

    return (
        <div className='setting-bar'>
            <label htmlFor="line-width">Line Width:</label>
            <input 
                onChange={onChangeLineWidth}
                id="line-width"
                defaultValue={lineWidth} 
                type="number" 
                min={1} 
                max={50}
            />

            <label htmlFor="line-color">Line color:</label>
            <input 
                onChange={onChangeColor}
                defaultValue={strokeColor}
                id="line-color"
                type="color" 
            />
        </div>
    );
}

export default SettingsBar;