### When our app first loads:

- The App renders as a Redux-connected container and fires an init action
- The rootReducer receives this init action and calls the GifsReducer (along with any other reducers that might be connected to it). Since the REQUEST_GIFS action is not being fired (which is the only action type that the GifsReducer cares about at the moment), the GifsReducer returns its default state of an empty array on gifs.data
- In App.js, mapStateToProps makes the empty gifs.data array available to App under this.props.gifs
- mapDispatchToProps binds the requestGif() action creator to the App's props, making it available under this.props.actions.requestGifs

### When the user enters text:

- The user enters text into the SearchBar, triggering its onInputChange event handler
- onInputChange fires the onTermChange prop being passed from the parent App container. onTermChange contains the this.props.actions.requestGifs action creator, and it is fired
- requestGifs starts an API call to Giphy and returns a promise while it waits for a result. It passes this promise to the rootReducer
- The redux-promise middleware sees that we are passing a promise and resolves it. It passes the result of the Giphy API request to our rootReducer
- The rootReducer passes this data through each reducer linked to it
- The GifsReducer's switch statement checks the action type of REQUEST_GIFS, which matches one of its cases. It uses the data from the REQUEST_GIFS action to create a new version of the state with an updated data property
- Redux notifies the connected App container that the store has been updated
- The App container receives the updated gifs from store via mapStateToProps and passes it to the GifList
- The GifList and GifItem components render the gifs
