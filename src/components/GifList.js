import React from 'react'
import GifItem from './GifItem'

const GifList = (props) => {

  // stateless because all data required is passed down from App
  const gifItems = props.gifs.map((image) => {
    return <GifItem key={image.id}
                    gif={image}
                    onGifSelect={props.onGifSelect}
                    onFavoriteSelect={props.onFavoriteSelect}
                    onFavoriteDeselect={props.onFavoriteDeselect}
                    isAuthenticated={props.isAuthenticated}
                    isFavorite={props.isFavorite} />
  })

  return (
    <div className='gif-list'>
      {gifItems}
    </div>
  )
}

export default GifList
