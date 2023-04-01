import { useRef, useState } from "react";
import SongWaveForm from "./SongWaveForm";
import "./trackCard.css";

const TrackCard = ({ track, audio, trackArrayBuffer, currentTime, index }) => {
  const [volume, setVolume] = useState("1");
  const [isMuted, setMuted] = useState(false)
  const volumeInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const handleInputChange = (e) => {
    const volumeValue = e.target.value;
    e.target.style.backgroundSize = volumeValue * 100 + "% 100%";
    audio.volume = volumeValue;
    setVolume(volumeValue);
  };
  const handleMute = () => {
    audio.muted = !audio.muted;
    setMuted(!isMuted)
    if (audio.muted) {
      setVolume(0)
      volumeInputRef.current.style.backgroundSize = "0% 100%";
      canvasContainerRef.current.style.filter = "grayscale(1)";
    } else {
      setVolume(audio.volume)
      volumeInputRef.current.style.backgroundSize = audio.volume * 100 + "% 100%";
      canvasContainerRef.current.style.filter = "grayscale(0)";
    }
  };

  const handleSolo = () => {
  }

  return (
    <div className="track-card">
      <SongWaveForm
        songArrayBuffer={trackArrayBuffer}
        currentTime={currentTime}
        canvasContainerRef={canvasContainerRef}
      />
      <div className="track-buttons">
        <p>{track.name}</p>
        <button onClick={handleSolo}>Solo</button>
        <div className="track-volume">
          <img src="/speaker.svg" alt="" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleInputChange}
            ref={volumeInputRef}
          />
        </div>
        <button onClick={handleMute} className={isMuted && "active"}>Mute</button>
      </div>
    </div>
  );
};
export default TrackCard;
