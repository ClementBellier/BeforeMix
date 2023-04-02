import { useEffect, useRef } from "react";
import { drawWaveForm, drawMiddleLine } from "../utils/functions/drawWaveForm";

const SongWaveForm = ({
  songArrayBuffer,
  pourcentTime,
  canvasContainerRef,
}) => {
  const backgroundCanvasref = useRef(null);
  const currentimeCanvasref = useRef(null);
  const pourcentTimeForCss = pourcentTime + "%";
  useEffect(() => {
    const canvas = backgroundCanvasref.current;
    const canvasContext = canvas.getContext("2d");
    drawMiddleLine(canvas, canvasContext, "#FEF4D1");
    drawWaveForm(songArrayBuffer, canvas, canvasContext, "#FEF4D1");
  }, [backgroundCanvasref.current]);

  useEffect(() => {
    const canvas = currentimeCanvasref.current;
    const canvasContext = canvas.getContext("2d");
    drawMiddleLine(canvas, canvasContext, "#5C0099");
    drawWaveForm(songArrayBuffer, canvas, canvasContext, "#5C0099");
  }, [currentimeCanvasref.current]);

  return (
    <div className="canvas-container" ref={canvasContainerRef}>
      <canvas ref={backgroundCanvasref} />
      <canvas
        ref={currentimeCanvasref}
        style={{ "--position": pourcentTimeForCss }}
      />
    </div>
  );
};
export default SongWaveForm;
