import { useState, useEffect } from 'react'
import './App.css'
import Photo from './Photo'

// DEFAULT AND SEARCH URL SET UP SO QUERY AND API CAN APPEND TO IT
const defaultUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  // BY DEFAULT DONT LOAD
  const [loading, setLoading] = useState(false)
  // EMPTY ARRAY BY DEFAULT
  const [photos, setPhotos] = useState([])
  // EMPTY STRING BY DEFAULT
  const [query, setQuery] = useState('')
  // PAGE NUMBER FROM UNSPLASH
  const [page, setPage] = useState(1)

  const fetchImages = async () => {
    // LOADING TRUE TO FETCH IMAGES
    setLoading(true)
    // URL IS LET BECAUSE IT CAN CHANGE BASED ON SEARCH OR DEFAULT
    let url
    const urlQuery = `&query=${query}`
    const urlPage = `&page=${page}`

    // USE THE DEFAULT IF THERE IS NOTHING INSIDE THE QUERY (SEARCH BAR)
    if (query) {
      url = `${searchUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w${urlPage}${urlQuery}`
    } else {
      url = `${defaultUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w${urlPage}`
    }

    // THE RESPONSE STORED IN "DATA" AFTER ITS FETCHED
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

      // THE ARRAY OF DATA, ONCE WE HAVE THE DATA, STOP LOADING
      // IF THERE IS SOMETHING IN THE QUERY TARGET DATA.RESULTS, IF NOT POSSIBLE GO BACK TO THE ORIGINAL
      setLoading(false)
      setPhotos(() => {
        if (query) {
          return [...data.results]
        } else {
          return [...data]
        }
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // USE-EFFECT TO STOP RE-RENDERING, REFETCH WHEN PAGE CHANGES
  useEffect(() => {
    fetchImages()
  }, [page])

  // HANDLES SEARCH BUTTON AND EVENT OBJECT
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
            // VALUE IS GOING TO BE THE STATE VALUE
          />
          <button type='submit' className='searchButton' onClick={handleSubmit}>
            Find Photos
          </button>
        </form>
      </section>

      {/* ITERATE OVER PHOTOS ARRAY  AND DISPLAY THE CODE IN THE PHOTO.JS FILE, PASSING PROPERTIES TO THE PHOTO COMPONENT */}
      <section className='photos'>
        <div className='photoContainer'>
          {photos.map((image, id) => {
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
