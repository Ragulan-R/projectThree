import { useState, useEffect } from 'react'
import './App.css'
import Photo from './Photo'

const mainUrl = `https://api.unsplash.com/photos`
const searchUrl = `https://api.unsplash.com/search/photos`

// setting the state of the photos going to be a empty array
// setting the state so default its not loading
function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])

  const fetchImages = async () => {
    setLoading(true)
    // url make be changing because it use may search or just get the default images on load
    let url
    url = `${mainUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w`
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // using useeffect so it only runs when the app loads
  useEffect(() => {
    fetchImages()
  }, [])

  return <h1> Stockify</h1>
}

export default App
