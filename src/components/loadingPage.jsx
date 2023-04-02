import { useState } from "react";
import Disk from "./disk";
import "./loadingPage.css";
import PlayButton from "./playButton";

const LoadingPage = ({ songCover, isLoading, setPassToPlayerPage }) => {
  return (
    <main className="colored-page">
      <div className="decoration" aria-hidden="true">
        <img src="decor-blob.svg" alt="" className="decoration__blob" />
        <Disk
          width="50vw"
          position={{ top: "-16vw", right: "-20vw" }}
          rotate={true}
          outline={true}
        />
      </div>
      <div className="loadingPage-text">
        <div>
          <h1>BeforeMix</h1>
          <h2>Écoutez des morceaux avant leur mix</h2>
          <p>
            Retrouvez des extraits ou morceaux complets en multipises avant
            traitement. Chaque piste correspond à une sortie de microphone, il
            est possible qu'il y est plusieurs pistes pour un seul instrument.
            De même, d'autres instruments peuvent être entendus en plus de celui
            qui est enregistré (par exemple, le son du saxophone peut être capté
            dans la piste de la trompette si les deux instruments sont
            enregistrés côte à côte)
          </p>
        </div>
        <div className="loading">
          <img src={songCover} className="loading-cover" />
          {isLoading ? (
            <div>En chargement...</div>
          ) : (
            <PlayButton onClickCallback={setPassToPlayerPage} />
          )}
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;
