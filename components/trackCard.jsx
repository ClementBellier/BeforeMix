import "./trackCard.css";

const TrackCard = () => {
  return (
    <div className="track-card">
      <canvas></canvas>
      <div className="track-buttons">
        <p>Saxophone</p>
        <button>Solo</button>
        <div>Volume</div>
        <button className="active">Mute</button>
      </div>
    </div>
  );
};
export default TrackCard;
