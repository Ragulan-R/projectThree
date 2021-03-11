// SUMMARY
// 1. SET UP THE 2 KEY ENDPOINTS THAT CAN BE APPENDED TO
// 2. SET UP THE STATES OF THE API, PHOTOS, QUERY AND PAGES
// 3. API SETUP - LOAD PAGE ONCE API CALLED AND RECEIVED, RESPONSE STORE IN "DATA", IF API CAN'T BE CALLED, LOG ERROR
// 4. PAGE SETUP - APP LOADS ON PG 1, IF QUERY EXISTS LOAD ...DATA.RESULTS, IF NOT LOAD DEFAULT DATA
// 5. USE-EFFECT IN PLACE TO STOP RE-RENDERING
// 6. HANDLE SUBMIT SETUP- CALLS FUNCTION AND DOESN'T RELOAD PAGE ONCE CLICKED
// 7. DISPLAYS PHOTO COMPONENT AND CONNECTS WITH PHOTO.JS

import { useState, useEffect } from 'react'
import './App.css'
import Photo from './Photo'

//1. DEFAULT AND SEARCH URL SET UP SO QUERY AND API CAN APPEND TO IT
const defaultUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

// 2. STATES
function App() {
  // BY DEFAULT DON'T LOAD API BEFORE CONTENTS
  const [loading, setLoading] = useState(false)
  // EMPTY ARRAY BY DEFAULT
  const [photos, setPhotos] = useState([])
  // EMPTY STRING BY DEFAULT
  const [query, setQuery] = useState('')
  // PAGE NUMBER FROM UNSPLASH
  const [page, setPage] = useState(1)

  // 3. API SETUP
  const fetchImages = async () => {
    // LOADING TRUE TO FETCH IMAGES
    setLoading(true)
    // URL IS LET BECAUSE IT CAN CHANGE BASED ON SEARCH OR DEFAULT
    let url
    const urlQuery = `&query=${query}`
    const urlPage = `&page=${page}`

    // 3. USE THE DEFAULT URL IF THERE IS NOTHING INSIDE THE QUERY (SEARCH BAR)
    if (query) {
      url = `${searchUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w${urlPage}${urlQuery}`
    } else {
      url = `${defaultUrl}?client_id=CodMP8r22yWvgC9SCYoAh9X-dEMQLKt6zKPO-vNiJ3w${urlPage}`
    }

    // 3. THE RESPONSE STORED IN "DATA" AFTER ITS FETCHED
    try {
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)

      //4. THE ARRAY OF DATA, ONCE WE HAVE THE DATA, STOP LOADING
      //4. IF THERE IS SOMETHING IN THE QUERY TARGET DATA.RESULTS, IF NOT POSSIBLE GO BACK TO THE ORIGINAL DATA SET FROM PAGE 1
      setLoading(false)
      setPhotos(() => {
        if (query) {
          return [...data.results]
        } else {
          return [...data]
        }
      })
    } catch (error) {
      // console.log(error)
      setLoading(false)
    }
  }

  //5. USE-EFFECT TO STOP RE-RENDERING, REFETCH WHEN PAGE OR QUERY CHANGES
  useEffect(() => {
    fetchImages()
  }, [page])

  //6.  HANDLES SEARCH BUTTON AND EVENT OBJECT
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchImages()
  }

  // 7. PHOTO ARRAY
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

      {/* ITERATE OVER PHOTOS ARRAY  AND DISPLAY THE CODE IN THE PHOTO.JS FILE ON THE BROWSER, PASSING PROPERTIES TO THE PHOTO COMPONENT */}
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
