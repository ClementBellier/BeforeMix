import { useState } from "react";
import "./trackCard.css";

const TrackCard = () => {
  const [volume, setVolume] = useState("0.9")
  const handleInputChange = (e) => {
    const val = e.target.value;
    e.target.style.backgroundSize = val * 100 + "% 100%";
    setVolume(val)
  };
  return (
    <div className="track-card">
      <canvas></canvas>
      <div className="track-buttons">
        <p>Saxophone</p>
        <button>Solo</button>
        <div className="track-volume">
          <img src="/speaker.svg" alt="" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleInputChange}
          />
        </div>
        <button>Mute</button>
      </div>
    </div>
  );
};
export default TrackCard;
