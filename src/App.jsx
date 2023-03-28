import { useState } from 'react'
import LoadingPage from '../components/loadingPage'
import PlayerPage from '../components/playerPage'
import './App.css'


const loadMusicArrayBuffer = async () => {
  const response = await fetch('../public/3-08-Odeka_de_Chocobo.mid')
  return await response.arrayBuffer()
}


function App() {
  const [isLoading, setLoading] = useState(true)

  return isLoading ? (<LoadingPage />) : (<PlayerPage />)
}

export default App
