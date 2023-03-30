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
  const [isLoading, setLoading] = useState(true);
  const [passToPlayerPage, setPassToPlayerPage] = useState(false);
  const songs = music.music;
  const [songToPlay, setSongToPlay] = useState(songs[0]);
  const [tracksArrayBuffer, setTracksArrayBuffer] = useState([]);

  useEffect(() => {
    setLoading(true);
    songToPlay.tracks.forEach(async (track) =>
      setTracksArrayBuffer(
        ...tracksArrayBuffer,
        await loadMusicArrayBuffer(track.audio)
      )
    );
    setLoading(false);
  }, []);
  console.log(tracksArrayBuffer);
  return passToPlayerPage ? (
    <PlayerPage
      song={songToPlay}
      setSong={setSongToPlay}
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
