import { useState } from "react";
import SongWaveForm from "./SongWaveForm";
import "./trackCard.css";

const TrackCard = ({track, audio, trackArrayBuffer, isPlaying, currentTime}) => {
  const [volume, setVolume] = useState("0.9")

  // if(isPlaying) audio.play()
  // if(!isPlaying) audio.pause()

  const handleInputChange = (e) => {
    const volumeValue = e.target.value;
    e.target.style.backgroundSize = volumeValue * 100 + "% 100%";
    audio.volume = volumeValue
    setVolume(volumeValue)
  };
  
  return (
    <div className="track-card">
      <SongWaveForm songArrayBuffer={trackArrayBuffer} currentTime={currentTime} />
      <div className="track-buttons">
        <p>{track.name}</p>
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
