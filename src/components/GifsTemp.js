import React from 'react'

// Using the parameter({gifs}) means that it pulls out the gifs key from whatever object it recieves, and then the gif
    // variable is available for use in the function
const GifsTemp = ({gifs}) => {
  const gifItems = gifs.map((gif) => {
    return(
      <li key={gif.id}><img src={gif.url} /></li>
    )
  })

  return (
    <ul className="gif-list">{gifItems}</ul>
  )
}

export default GifsTemp;
