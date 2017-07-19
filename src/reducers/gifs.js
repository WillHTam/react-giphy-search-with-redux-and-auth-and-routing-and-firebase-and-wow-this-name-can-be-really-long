import { REQUEST_GIFS, FETCH_FAVORITED_GIFS } from '../actions'

const initialState =  {
  data: [],
  favorites: []
}

// two arguments: state and action
// first set up an initialState above, to avoid null or undefined for props.gifs.map in GifsList
    // state here just refers to the state that GifsReducer is responsible for, not the whole application
// action argument handles any action dispatched in the application
    // therefore use a switch statement to check for any action that is relevant to the reducer
// Line20 is object spread syntax
    // Creates a new version of the store, copying all enumerable properties from the previous version
    // then updates the value of the data key on the new object
    // don't use state.data = action.payload.body.data because we don't mutate state directly in Redux
export default function gifs(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS:
        return {
            ...state, data: action.payload.body.data
        }
    case FETCH_FAVORITED_GIFS:
        // gifs returned from giphy as an array, but in a JSON object from Firebase
        // This iterates through the Firebase response object and adds it to an empty array
            // then returns the array from hte reudcer
        var arr=[]
        for ( var i in action.payload) {
            if (action.payload.hasOwnProperty(i)) {
                arr.push(action.payload[i])
            }
        }
        return {
            ...state, favorites: arr
        }
    default:
      return state
  }
}
