import React from 'react'

class GifItem extends React.Component {
    // we can use a constructor here because this doesn't affect the application store
        // keeping track of whether the individual GifItems were favorited would be too complex
    // Can use React's state for minor UI changes on individual components
        // If it affects other parts of the application or needs an external API call, should dispatch an action instead
    constructor(props) {
        // Use props as argument in constructor and super methods
        // Allows use of this.props within the constructor
        super(props)
        this.state = { favorited: this.props.isFavorite }
    }

    favoriteGif() {
        this.setState({ favorited: true })
        this.props.onFavoriteSelect(this.props.gif)
    }

    unfavoriteGif() {
        this.setState({ favorited: false})
        this.props.onFavoriteSelect(this.props.gif)
    }

    renderFavoriteHeart = () => {
        // don't show if not logged in
        if (! this.props.isAuthenticated) {
            return ''
        }

        // if already fav'd, show fav'd heart and do unfavoriteGif on click
        if (this.state.favorited) {
            return <i className="favorite fa fa-heart" onClick={() => this.unfavoriteGif()} />
        }

        // show heart and fav if clicked
        return <i className="favorite fa fa-heart-o" onClick={() => this.favoriteGif()}/>
    }

    render() {
        return (
            <div className="gif-item">
                { this.renderFavoriteHeart() }
                <img src={this.props.gif.images.downsized.url} alt="" onClick={() => this.props.onGifSelect(this.props.gif)} />
            </div>
        )
    }
}

export default GifItem
