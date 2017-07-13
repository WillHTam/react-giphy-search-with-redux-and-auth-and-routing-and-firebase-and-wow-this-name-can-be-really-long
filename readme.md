## Giphy with Redux
### Adding redux to https://github.com/WillHTam/react-giphy-search

```
App <--(state.term)-- SearchBar.js
    --(gifs)--> GifList.js --(gifs)--> GifItem.js
    --(selectedGif & modalIsOpen) --> GifModal.js
```

- The previous project was done entirely with the structure above to send state back and forth with props
- Now add Redux to store the entire state of the application in a store, so all components will get their state directly from the store. They also inform the store of any changes to make instead of doing it themselves.
- A single source of truth instead of constructors in App & SearchBar
- Instead of using setState to write to state tree directly, dispatch an action
object. Requires a type.
- Reducers make the changes. Take two arguments: previous state and an action,
and return the next state as a new object. Similar to using 'Save As', never
mutates the state directly but instead copies, modifies, and then returns it.
- An action is a plain JS object that sends data from application to store
    - Actions are fired whenever the state needs to change, and the switch statent in reducers 'catch' these actiosn so that they can update the store
    - Require
        1) The action itself - type & payload
        2) Action type - const
        3) Action creator - function that creates actions 

### The New Flow
```
App -> Action -> React-Promise Middleware -> Reducer -> Store -> Back to App
```
