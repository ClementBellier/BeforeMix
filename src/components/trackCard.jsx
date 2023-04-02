import { useEffect, useRef, useState } from "react";
import SongWaveForm from "./SongWaveForm";
import "./trackCard.css";

const TrackCard = ({ track, pourcentTime, isSolo, setSolo, index }) => {
  const [volume, setVolume] = useState("1");
  const [isMuted, setMuted] = useState(false);
  const [isTrackSolo, setTrackSolo] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const volumeInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const muteTrack = () => {
    track.audio.muted = true;
    setMuted(true);
    setVolume(0);
    volumeInputRef.current.style.backgroundSize = "0% 100%";
    canvasContainerRef.current.style.filter = "sepia(1)";
  };
  const unmuteTrack = () => {
    track.audio.muted = false;
    setMuted(false);
    setVolume(track.audio.volume);
    volumeInputRef.current.style.backgroundSize = track.audio.volume * 100 + "% 100%";
    canvasContainerRef.current.style.filter = "sepia(0)";
  };

  useEffect(() => {
    if (isSolo !== null && isSolo !== index) {
      muteTrack();
      setTrackSolo(false);
      setDisabledButton(true);
    }
    if (!isSolo || isSolo === index) {
      unmuteTrack();
      setDisabledButton(false);
    }
  }, [isSolo]);

  const handleInputChange = (e) => {
    const volumeValue = e.target.value;
    e.target.style.backgroundSize = volumeValue * 100 + "% 100%";
    track.audio.volume = volumeValue;
    setVolume(volumeValue);
  };
  const handleMute = (e) => {
    e.preventDefault();
    if (track.audio.muted) {
      unmuteTrack();
    } else {
      muteTrack();
    }
  };

  const handleSolo = (e) => {
    e.preventDefault();
    if (!isSolo || isSolo !== index) {
      setSolo(index);
      setTrackSolo(true);
    }
    if (isSolo === index) {
      setSolo(null);
      setTrackSolo(false);
    }
  };

  return (
    <div className="track-card">
      <SongWaveForm
        songArrayBuffer={track.arrayBuffer}
        pourcentTime={pourcentTime}
        canvasContainerRef={canvasContainerRef}
      />
      <div className="track-buttons">
        <p>{track.name}</p>
        <button
          onClick={handleSolo}
          className={isTrackSolo ? "active" : undefined}
        >
          Solo
        </button>
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
            disabled={disabledButton}
          />
        </div>
        <button
          onClick={handleMute}
          className={isMuted ? "active" : undefined}
          disabled={disabledButton}
        >
          Mute
        </button>
      </div>
    </div>
  );
};
export default TrackCard;
