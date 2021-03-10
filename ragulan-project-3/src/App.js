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
    // loading is true to fetch the images
    setLoading(true)
    // url make be changing because it use may search or just get the default images on load
    let url
    url = `${mainUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w`
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      // array with the photos
      setPhotos(data)
      // once images are fetched stop loading
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // using useeffect so it only runs when the app loads
  useEffect(() => {
    fetchImages()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('click')
  }

  //  {
  //    /* iterating over the photos array */
  //  }
  return (
    <main>
      <section className='search'>
        <h1 className='logo'>Stockify</h1>
        <h4>Home of High Quality Stock Images</h4>
        <form className='searchForm'>
          <input type='text' placeholder='search' className='searchInput' />
          <button type='submit' className='searchButton' onClick={handleSubmit}>
            Find Photos
          </button>
        </form>
      </section>
      <section className='photo'>
        <div className='photoContainer'>
          {photos.map((image, index) => {
            console.log(image)
            return <Photo key={index} {...image} />
          })}
        </div>
      </section>
    </main>
  )
}

export default App
