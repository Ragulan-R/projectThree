import React from 'react'

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: { name, portfolio_url },
}) => {
  return (
    <section className='photos'>
      <img src='{regular}' alt='alt_description' />
      <div>
        <h5>{name}</h5>
        <p>{likes}</p>
        <a href={portfolio_url}></a>
      </div>
    </section>
  )
}

export default Photo
