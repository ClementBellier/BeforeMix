import { useEffect, useRef } from "react";
import { beautifyTime } from "../utils/functions/beautifyTime";

const ProgressBar = ({ currentTime, pourcentTime, setCurrentTime, chosenTime, setChosenTime, duration }) => {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.style.backgroundSize = pourcentTime + "% 100%"
  }, [pourcentTime]);
  useEffect(() => {
    const pourcentChoseTime = chosenTime * 100 / duration
    inputRef.current.style.backgroundSize = pourcentChoseTime + "% 100%"
  }, [chosenTime]);

  const handleChange = (e) => {
    const newTime = e.target.value
    setChosenTime(newTime)
    setCurrentTime(newTime)
  }

  return (
    <>
      <div className="display-time">{beautifyTime(currentTime)}</div>
      <input
        type="range"
        min="0"
        max={duration}
        step="0.01"
        value={currentTime}
        ref={inputRef}
        onChange={handleChange}
      />
      <div className="display-time">{beautifyTime(duration)}</div>
    </>
  );
};
export default ProgressBar;
