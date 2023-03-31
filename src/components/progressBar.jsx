import { useEffect, useRef } from "react";

const ProgressBar = ({ currentTime, pourcentTime, duration }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.style.backgroundSize = pourcentTime + "% 100%"
  }, [pourcentTime]);
  return (
    <>
      <div className="current-time">{currentTime}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={pourcentTime}
        ref={inputRef}
      />
      <div className="song-time">{duration}</div>
    </>
  );
};
export default ProgressBar;
