import { combineReducers } from 'redux'
import GifsReducer from './gifs'
import ModalReducer from './modal'
// routerReducer intercepts navigation actions and keeps track of location in store
import { routerReducer } from 'react-router-redux'

// Use Redux' combineReducers to create a single object that contains a bunch of reducers
// gifs, the key of the object, is the name of the state and the value is what is being returned by the reducer
const rootReducer = combineReducers({
    gifs: GifsReducer,
    modal: ModalReducer,
    router: routerReducer
})

export default rootReducer
