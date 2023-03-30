import Disk from "./disk";
import "./playerPage.css";
import TrackCard from "./trackCard";
import PlayButton from "./playButton";

const PlayerPage = () => {
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
            <img src="/lala_dp_front-1024x925.jpg" />
          </div>
          <h1>Summertime</h1>
          <h2>Bols & Knecht</h2>
          <div>
            <a href="">Site</a>
            <a href="">Spotify</a>
          </div>
        </div>
        <div className="song__trackslist--container">
          <div className="song__trackslist--shadow"></div>
          <div className="song__trackslist">
            <TrackCard />
            <TrackCard />
            <TrackCard />
            <TrackCard />
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
