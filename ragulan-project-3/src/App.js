import { useState, useEffect } from 'react'
import './App.css'
import Photo from './Photo'

// main url to get the default photos
const mainUrl = `https://api.unsplash.com/photos`
const searchUrl = `https://api.unsplash.com/search/photos`

// setting the state of the photos going to be a empty array
// setting the state so default its not loading
function App() {
  const [loading, setLoading] = useState(false)
  // The photo library starts with an empty array
  const [photos, setPhotos] = useState([])
  // The search field, starts with an empty string
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    // loading is true to fetch the images
    setLoading(true)
    // url make be changing because it use may search or just get the default images on load
    let url

    // user types something in the search box and once they hit submit, append it to the url
    const urlQuery = `&query=${query}`
    // only use this url if there is nothing in the query, if there is something use the search url, if nothing use default url

    if (query) {
      url = `${searchUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w$${urlQuery}`
    } else {
      url = `${mainUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w`
    }

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

  // handles the search button and prevents refresh
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('click')
    fetchImages()
  }

  // iterating over the photos array

  return (
    <main>
      <section className='search'>
        <h1 className='logo'>Stockify</h1>
        <h4 className='subHeading'>Home of High Quality Stock Images</h4>
        <form className='searchForm'>
          {/* value is going to be the state value, and changes based on input */}
          <input
            type='text'
            placeholder='search'
            className='searchInput'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // so when user types the state value changes
          />
          <button type='submit' className='searchButton' onClick={handleSubmit}>
            Find Photos
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photoContainer'>
          {photos.map((image, index) => {
            console.log(image)
            return <Photo key={image.id} {...image} />
          })}
        </div>
        {/* loads more pictures based on a scroll
        {loading && <h2 className='loading'>Loading More Images...</h2>} */}
      </section>
    </main>
  )
}

export default App
