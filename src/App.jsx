import { useEffect, useState } from "react";
import LoadingPage from "./components/loadingPage";
import PlayerPage from "./components/playerPage";
import "./App.css";
import music from "../public/data/music.json";

const loadMusicArrayBuffer = async (url) => {
  const response = await fetch(url);
  return await response.arrayBuffer();
};

function App() {
  const audioContext = new window.AudioContext 
  const [isLoading, setLoading] = useState(true);
  const [passToPlayerPage, setPassToPlayerPage] = useState(false);
  const songs = music.music;
  const [songToPlay, setSongToPlay] = useState(songs[0]);
  const [tracksArrayBuffer, setTracksArrayBuffer] = useState([]);
  const [audios, setAudios] = useState([])

  useEffect(() => {
    setLoading(true);
    songToPlay.tracks.forEach(async (track) => {
      const arrayBuffer = await loadMusicArrayBuffer(track.audio)
      const decodeArrayBuffer = await audioContext.decodeAudioData(arrayBuffer)
      setTracksArrayBuffer((previousTracksArrayBuffer)=>
        [...previousTracksArrayBuffer,
        decodeArrayBuffer]
      );
      const audio = new Audio(track.audio)
      setAudios((previousAudio)=>[...previousAudio, audio])
    });
    setLoading(false);
  }, []);
  return passToPlayerPage ? (
    <PlayerPage
      song={songToPlay}
      setSong={setSongToPlay}
      audios={audios}
      tracksArrayBuffer={tracksArrayBuffer}
    />
  ) : (
    <LoadingPage
      isLoading={isLoading}
      setPassToPlayerPage={setPassToPlayerPage}
    />
  );
}

export default App;
