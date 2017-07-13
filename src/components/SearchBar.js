import React from 'react'

// App renders a SearchBar, passing through the requestGifs action creator via a prop called onTermChange
// Whenever text is added or removed from the input field, JS event fires, and SearchBar calls its onInputChange method
// onInputChange calls the onTermChange prop from App, and the requestGifs action creator function recieves the term as an argumetn

class SearchBar extends React.Component {

    onInputChange(term) {
        // remove state setter but leave this because this is how App will pass REQUEST_GIFS to SearchBar
        this.props.onTermChange(term)
    }

    render() {
        return(
            <div className="search">
                <input placeholder="Enter text to search for gifs!" onChange={event => this.onInputChange(event.target.value)}/>
            </div>
        )
    }
}

export default SearchBar

// No longer want SearchBar to handle state
// import React from 'react'
//
// class SearchBar extends React.Component {
//   constructor () {
//     super()
//     this.state = { term: '' }
//   }
//   // From whence 'onTermChange'? Since it was a prop set on it in App, it has been inherited for use and to pass data by this component.
//   onInputChange (term) {
//     this.setState({term})
//     this.props.onTermChange(term)
//   }
//
//   render () {
//     return (
//       <div className='search'>
//         <input placeholder="Enter text to search for gifs!" onChange={event => this.onInputChange(event.target.value)} />
//       </div>
//     )
//   }
// }
//
// export default SearchBar
