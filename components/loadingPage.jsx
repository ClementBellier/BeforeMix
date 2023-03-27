import "./loadingPage.css";

const LoadingPage = () => {
  return (
    <main className="colored-page">
      <div className="decoration">
        <img src="/decor-blob.svg" alt="" className="decoration__blob" />
        <img src="/disk.svg" alt="" className="decoration__disk" />
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
        <div className="loading">Chargement</div>
      </div>
    </main>
  );
};

export default LoadingPage;
