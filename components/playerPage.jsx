import Disk from "./disk";
import "./playerPage.css";
import TrackCard from "./trackCard";

const PlayerPage = () => {
  return (
    <main className="player-page">
      <div className="song">
        <div className="song__infos">
          <div className="song__infos-disk">
            <Disk
              width="180px"
              position={{ left: "30%", zIndex: "-1"}}
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
        <div className="song__trackslist">
          <TrackCard />
          <TrackCard />
          <TrackCard />
          <TrackCard />
        </div>
      </div>
      <div className="background-player" aria-hidden="true">
        <img src="/arriereplan-lecteur.svg" alt="" />
        <img src="/arriereplan-titres.svg" alt="" />
      </div>
    </main>
  );
};

export default PlayerPage;
