import Disk from "./disk";
import "./playerPage.css";
import TrackCard from "./trackCard";
import PlayButton from "./playButton";

const PlayerPage = ({ song, setSong, tracksArrayBuffer }) => {

  return (
    <main className="player-page">
      <div className="song">
        <div className="song__infos">
          <div className="song__infos-disk">
            <Disk
              width="180px"
              position={{ left: "20%", zIndex: "-1" }}
              rotate={true}
            />
            <img src={song.cover} alt="Cover d'un album du groupe" />
          </div>
          <h1>{song.title}</h1>
          <h2>{song.groupName}</h2>
          <div>
            {song.links.site && <a href={song.links.site}>Site</a>}
            {song.links.spotify && <a href={song.links.spotify}>Spotify</a>}
            {song.links.youtube && <a href={song.links.youtube}>Youtube</a>}
          </div>
        </div>
        <div className="song__trackslist--container">
          <div className="song__trackslist--shadow"></div>
          <div className="song__trackslist">
            {song.tracks.map((track, index) => (
              <TrackCard
                track={track}
                trackArrayBuffer={tracksArrayBuffer[index]}
                key={track.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="player-controls">
        <PlayButton />
        <div className="loop">
          <img src="/loop-icon.svg" />
        </div>
        <div className="current-time">01:30</div>
        <input type="range" min="0" max="100" value="90" />
        <div className="song-time">03:32</div>
      </div>
      <div className="other-songs">
        <p>D'autres titres</p>
        <img src="lala_dp_front-1024x925.jpg" />
        <img src="lala_dp_front-1024x925.jpg" />
        <img src="lala_dp_front-1024x925.jpg" />
        <img src="lala_dp_front-1024x925.jpg" />
        <img src="lala_dp_front-1024x925.jpg" />
        <img src="lala_dp_front-1024x925.jpg" />
      </div>
      <div className="background-player" aria-hidden="true">
        <img src="/arriereplan-lecteur.svg" alt="" />
        <img src="/arriereplan-titres.svg" alt="" />
      </div>
    </main>
  );
};

export default PlayerPage;
