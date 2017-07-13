import React from 'react'
// import GifsTemp from '../components/GifsTemp'
// import connect to link React and Redux, and to give a way to pull Redu'x state into React as props
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import all exported modules in index.js as single object 'Actions'. Gives access to all of action creators to hook into components
import * as Actions from '../actions'
// Can import GifList with no modifications since GifList already expects an array of gifs to be passed down as props
    // Already map results of GifsReducer to App's props via mapStateToProps
import GifList from '../components/GifList'
import GifModal from '../components/GifModal'
import SearchBar from '../components/SearchBar'
import '../styles/app.css'

// Where does the gifs object come from? Line33
// >> Pass requestGifs action creator via onTermChange prop.
    // Thus whenver onInputChange is fired by enter/removing text, action creator fires as well
class App extends React.Component {
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestGifs} />
        <GifList gifs={ this.props.gifs } onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) } />
        <GifModal modalIsOpen={ this.props.modalIsOpen }
                  selectedGif={ this.props.selectedGif }
                  onRequestClose = { () => this.props.actions.closeModal() } />
      </div>
    )
  }
}

// mapDispatchToProps
    // Passes data from container to store. Provides the ability for the container to tell the store that it needs to change and enables this by adding action creators to our container as props
// mapStateToProps
    // Passes data to container from store. Makes the result of reducers available to our container as props

// mapStateToProps will be the first argument for connect
// Connect lets the App component to subscribe to the Redux store update
    // Whenver the store changes, mapStateToProps is called
// mapStateToProps returns a plain object which becomes available to App as props
    // Which can then be passed down to GifsTemp as this.props.gifs
// Where do the gifs come from?
    // In combineReducers, set the result of GifsReducer to the state with 'gifs' key
    // Here in mapStateToProps, link 'gifs' from GifsReducer to this.props.gifs in App
function mapStateToProps(state) {
  return {
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  }
}

// How did App recieve the requestGifs action creator?
// We set this.props.actions on App by calling bindActionCreators
// bindActionCreators takes a single object whose values are action creators, in this case,
    // the Actions object imported fromm src/actions/index.js
    // and wraps every action creator in a dispatch call so taht they can be invoked within our container
    // this is how the app is notified there is a state change
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

// Here we are not exporting App, but instead the results of connect
    // Wrapping <App /> with <Provider> in src/index.js made the Redux store available
    // to connect()() calls within child components. This is how mapStateToProps can access the state
// connect has two parentheses because it has two different function calls
    // connect(mapStateToProps, mapDispatchToProps) returns a function
    // then the second function is called immediately with App passed in as an argument
export default connect(mapStateToProps, mapDispatchToProps)(App)
