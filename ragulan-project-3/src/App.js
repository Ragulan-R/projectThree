import { useState, useEffect } from 'react'
import './App.css'
import Photo from './Photo'

// main url to get the default photos and search url, so queries can get appended to it

// setting the state of the photos going to be a empty array & setting the state so default its not loading
// The photo library starts with an empty array
// The search field, starts with an empty string
// search - get value and append it to search url
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    // loading is true to fetch the images
    setLoading(true)
    // url make be changing because it use may search or just get the default images on load
    let url
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w${urlQuery}`
    } else {
      url = `${mainUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      // array with the photos

      // setPhotos(() => {
      //   if (query) {
      //     return [...data.results]
      //   }
      // })

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

  // HANDLES SEARCH BUTTON
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchImages()
  }

  // PHOTO ARRAY
  return (
    <main>
      <section className='search'>
        <h1 className='logo'>Stockify</h1>
        <h4 className='subHeading'>Home of High Quality Stock Images</h4>
        <form className='searchForm'>
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
            return <Photo key={image.id} {...image} />
          })}
        </div>
      </section>
      <footer>
        <p>Made @ Juno College</p>
      </footer>
    </main>
  )
}

export default App
// user types something in the search box and once they hit submit, append it to the url
// const urlQuery = `&query=${query}`
// only use this url if there is nothing in the query, if there is something use the search url, if nothing use default url
// url = `${searchUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w$${urlQuery}`
