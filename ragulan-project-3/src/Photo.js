import React from 'react'

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
        <p>{likes} likes</p>
        <p>
          <a href={portfolio_url}>Portfolio</a>
        </p>
      </div>
    </section>
  )
}

export default Photo
