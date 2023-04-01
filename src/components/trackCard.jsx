import { useEffect, useRef, useState } from "react";
import SongWaveForm from "./SongWaveForm";
import "./trackCard.css";

const TrackCard = ({
  track,
  audio,
  trackArrayBuffer,
  currentTime,
  isSolo,
  setSolo,
  index,
}) => {
  const [volume, setVolume] = useState("1");
  const [isMuted, setMuted] = useState(false);
  const [isTrackSolo, setTrackSolo] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const volumeInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const muteTrack = () => {
    audio.muted = true;
    setMuted(true);
    setVolume(0);
    volumeInputRef.current.style.backgroundSize = "0% 100%";
    canvasContainerRef.current.style.filter = "grayscale(1)";
  };
  const unmuteTrack = () => {
    audio.muted = false;
    setMuted(false);
    setVolume(audio.volume);
    volumeInputRef.current.style.backgroundSize = audio.volume * 100 + "% 100%";
    canvasContainerRef.current.style.filter = "grayscale(0)";
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
    audio.volume = volumeValue;
    setVolume(volumeValue);
  };
  const handleMute = (e) => {
    e.preventDefault();
    if (audio.muted) {
      unmuteTrack();
    } else {
      muteTrack();
    }
  };

  const handleSolo = (e) => {
    e.preventDefault();
    console.log("handleSolo");
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
        songArrayBuffer={trackArrayBuffer}
        currentTime={currentTime}
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
