import Disk from "./disk";
import "./playerPage.css";
import TrackCard from "./trackCard";
import PlayButton from "./playButton";
import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import music from "../../public/data/music.json";

const PlayerPage = ({ song, setSong, tracks, allSongs }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0");
  const [pourcentTime, setPourcentTime] = useState("0");
  const [chosenTime, setChosenTime] = useState(null);
  const [loopActivate, setLoopActivate] = useState(false);
  const [isSolo, setSolo] = useState(null);
  const audios = tracks.reduce((acc, value) => [...acc, value.audio], []);
  const audioRef = audios[0];
  const duration = audioRef.duration;

  useEffect(() => {
    if (!loopActivate) {
      setPlaying(false);
    }
  }, [audioRef.ended]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      audios.map((audio) => audio.play());
      interval = setInterval(() => {
        const audioCurrentTime = audioRef.currentTime;
        const pourcentTime = (audioCurrentTime * 100) / duration;
        setCurrentTime(audioCurrentTime);
        setPourcentTime(pourcentTime);
      }, 10);
    }
    if (!isPlaying && currentTime) {
      audios.map((audio) => audio.pause());
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audios.map((audio) => audio.pause());
      audios.map((audio) => (audio.currentTime = chosenTime));
      audios.map((audio) => audio.play());
    } else {
      audios.map((audio) => (audio.currentTime = chosenTime));
    }
  }, [chosenTime]);

  const handleLoop = () => {
    audios.map((audio) => (audio.loop = !audio.loop));
    setLoopActivate((activate) => !activate);
  };

  const handleChangeSong = (index) =>{
    audios.map((audio) => audio.pause());
    audios.map((audio) => audio.remove());
    setSong(music.music[index])
  }

  return (
    <main className="player-page">
      <div className="song">
        <div className="song__infos">
          <div className="song__infos-disk">
            <Disk
              width="180px"
              position={{ left: "20%", zIndex: "-1" }}
              rotate={isPlaying}
            />
            <img src={song.cover} alt="Cover d'un album du groupe" />
          </div>
          <h1>{song.title}</h1>
          <h2>{song.groupName}</h2>
          <div className="song__infos-links">
            {song.links.site && <a href={song.links.site}>Site</a>}
            {song.links.spotify && <a href={song.links.spotify}>Spotify</a>}
            {song.links.youtube && <a href={song.links.youtube}>Youtube</a>}
          </div>
        </div>
        <div className="song__trackslist--container">
          <div className="song__trackslist--shadow"></div>
          <div className="song__trackslist">
            {tracks.map((track, index) => (
              <TrackCard
                track={track}
                pourcentTime={pourcentTime}
                isSolo={isSolo}
                setSolo={setSolo}
                index={index + 1} //Eviter un index 0 pour pouvoir rentrer dans le useEffect
                key={track.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="player-controls">
        <PlayButton onClickCallback={setPlaying} isPlaying={isPlaying} />
        <div
          className={loopActivate ? "loop loop-activate" : "loop"}
          onClick={handleLoop}
        >
          <svg>
            <use href="#loop-icon" />
          </svg>
        </div>
        <ProgressBar
          currentTime={currentTime}
          pourcentTime={pourcentTime}
          setCurrentTime={setCurrentTime}
          chosenTime={chosenTime}
          setChosenTime={setChosenTime}
          duration={duration}
        />
      </div>
      <div className="other-songs">
        <p>Les titres</p>
        {allSongs.map((song, index) => (
          <div
            className="cover-container"
            key={song.title}
            onClick={() => handleChangeSong(index)}
          >
            <img
              src={song.cover}
              alt={`Couverture de l'album de ${song.groupName}`}
            />
          </div>
        ))}
      </div>
      <div className="background-player" aria-hidden="true">
        <img src="/arriereplan-lecteur.svg" alt="" />
        <img src="/arriereplan-titres.svg" alt="" />
      </div>
    </main>
  );
};

export default PlayerPage;
