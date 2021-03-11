import React from 'react'

// DESTRUCTURING
const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: { name, portfolio_url },
}) => {
  return (
    <section className='photo'>
      <img src={regular} alt={alt_description} />
      <div className='photoDetails'>
        <h6>{name}</h6>
        <h6>{likes} likes</h6>
        <h6>
          <a href={portfolio_url}>Author</a>
        </h6>
      </div>
    </section>
  )
}

export default Photo
