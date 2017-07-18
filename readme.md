## React Giphy Search
### Now with Redux, Routing, Auth, and Firebase

- React Router watches for changes in the URL and updates the components on the screen accordingly. App component will render whatever React Router tells it to.
- configureStore.js makes the store aware of the browser location with the history package of react-router
- React Router keeps track of the current location by detecting the path in the URL, which allows it to render the proper components
- render can return html in arrays so that you don't have to potentially affect the layout by having to wrap everything in one parent div.
- Only need to use mapDispatchToProps and bindActionCreators if the container has a component that is not aware of Redux
- Higher order components are functions that take an existing component and then wraps it in another component to add some functionality
    - Seen in containers/App.js with Private and PublicRoute

