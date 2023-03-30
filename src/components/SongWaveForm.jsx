import { useEffect, useRef } from "react";
import { drawWaveForm, drawMiddleLine } from "../utils/functions/drawWaveForm";

const SongWaveForm = ({songArrayBuffer}) => {
    const ref = useRef(null)
    useEffect(()=>{
        const canvas = ref.current
        const canvasContext = canvas.getContext('2d')
        drawMiddleLine(canvas,canvasContext,"var(--tertiary-color)")
        drawWaveForm(songArrayBuffer,canvas,canvasContext,"var(--tertiary-color)","100")
    },[ref.current])
    return <canvas ref={ref} />
}
export default SongWaveForm