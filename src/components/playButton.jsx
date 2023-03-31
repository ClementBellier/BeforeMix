import "./playButton.css";

const PlayButton = ({onClickCallback}) => {
  return (
    <div className="play-button" onClick={()=>onClickCallback(state=>!state)}>
      <img src="/ellipse-play_button.svg" className="ellipse-play_button" />
      <img src="/play-icon.svg" className="play-icon" />
    </div>
  );
};

export default PlayButton;
