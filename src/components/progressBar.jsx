import { useEffect, useRef } from "react";

const ProgressBar = ({ currentTime, pourcentTime, setCurrentTime, setChosenTime, duration }) => {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.style.backgroundSize = pourcentTime + "% 100%"
  }, [pourcentTime]);

  const handleChange = (e) => {
    const newTime = e.target.value
    setChosenTime(newTime)
    setCurrentTime(newTime)
  }

  return (
    <>
      <div className="current-time">{currentTime}</div>
      <input
        type="range"
        min="0"
        max={duration}
        step="0.01"
        value={currentTime}
        ref={inputRef}
        onChange={handleChange}
      />
      <div className="song-time">{duration}</div>
    </>
  );
};
export default ProgressBar;
