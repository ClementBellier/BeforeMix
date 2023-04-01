import { useEffect, useRef } from "react";
import { drawWaveForm, drawMiddleLine } from "../utils/functions/drawWaveForm";

const SongWaveForm = ({songArrayBuffer, currentTime, canvasContainerRef}) => {
    const backgroundCanvasref = useRef(null)
    const currentimeCanvasref = useRef(null)

    useEffect(()=>{
        const canvas = backgroundCanvasref.current
        const canvasContext = canvas.getContext('2d')
        drawMiddleLine(canvas,canvasContext,"#DED1A7")
        drawWaveForm(songArrayBuffer,canvas,canvasContext,"#FEF4D1","100")
    },[backgroundCanvasref.current])

    useEffect(()=>{
        const canvas = currentimeCanvasref.current
        const canvasContext = canvas.getContext('2d')
        drawWaveForm(songArrayBuffer,canvas,canvasContext,"#5C0099",currentTime)
    },[currentTime, currentimeCanvasref.current])

    return <div className="canvas-container" ref={canvasContainerRef}><canvas ref={backgroundCanvasref} /><canvas ref={currentimeCanvasref} /></div>
}
export default SongWaveForm