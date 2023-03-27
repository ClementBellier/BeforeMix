import LoadingPage from '../components/loadingPage'
import './App.css'


const loadMusicArrayBuffer = async () => {
  const response = await fetch('../public/3-08-Odeka_de_Chocobo.mid')
  return await response.arrayBuffer()
}


function App() {
  return <LoadingPage />
}

export default App
