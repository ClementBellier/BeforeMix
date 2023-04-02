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
  const audioContext = new window.AudioContext();
  const [isLoading, setLoading] = useState(true);
  const [passToPlayerPage, setPassToPlayerPage] = useState(false);
  const songs = music.music;
  const [songToPlay, setSongToPlay] = useState(songs[0]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks([]);
    setLoading(true);
    setPassToPlayerPage(false);
    songToPlay.tracks.forEach(async (track) => {
      const arrayBuffer = await loadMusicArrayBuffer(track.audio);
      const decodeArrayBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const audio = new Audio(track.audio);
      setTracks((previousTracks) => [
        ...previousTracks,
        { name: track.name, arrayBuffer: decodeArrayBuffer, audio },
      ]);
    });
    setLoading(false);
  }, [songToPlay]);

  return passToPlayerPage ? (
    <PlayerPage
      song={songToPlay}
      setSong={setSongToPlay}
      tracks={tracks}
      allSongs={songs}
    />
  ) : (
    <LoadingPage
      songCover={songToPlay.cover}
      isLoading={isLoading}
      setPassToPlayerPage={setPassToPlayerPage}
    />
  );
}

export default App;
