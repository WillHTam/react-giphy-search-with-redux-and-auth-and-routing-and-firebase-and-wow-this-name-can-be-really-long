## React Giphy Search
### Now with Redux, Routing, Auth, and Firebase

- React Router watches for changes in the URL and updates the components on the screen accordingly. App component will render whatever React Router tells it to.
- configureStore.js makes the store aware of the browser location with the history package of react-router
- Replace ReduxPromise with ReduxThunk to control dispatch(), so that actions can be fired conditionally
- Use Firebase update to favorite gifs
    - pull in the reference for the logged-in user's UID
    - update avoids creating duplicate data
    - removal is similar
        - reference the first child path (user ID)
        - and the second child path (gif ID), and removing the data at the second child path
