import Disk from "./disk";
import "./loadingPage.css";
import PlayButton from "./playButton";

const LoadingPage = ({
  allSongs,
  idSongToPlay,
  isLoading,
  setSongToPlay,
  setPassToPlayerPage,
}) => {
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
            Retrouvez des extraits ou morceaux complets en multipistes avant
            traitement. Chaque piste correspond à une sortie de microphone, il
            est possible qu'il y ait plusieurs pistes pour un seul instrument.
            De même, d'autres instruments peuvent être entendus en plus de celui
            qui est enregistré (par exemple, le son du saxophone peut être capté
            dans la piste de la trompette si les deux instruments sont
            enregistrés côte à côte)
          </p>
        </div>
        <div className="loading">
          <div className="covers">
            {allSongs.map((song, index) => (
              <img
                src={song.cover}
                className={song.id === idSongToPlay ? "loading-cover" : ""}
                onClick={()=>setSongToPlay(allSongs[song.id])}
                key={`${song.title}-${index}`}
              />
            ))}
          </div>
          <span>{isLoading ? "En chargement..." : "Chargement terminé"}</span>
          <PlayButton
            onClickCallback={setPassToPlayerPage}
            isPlaying={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;
