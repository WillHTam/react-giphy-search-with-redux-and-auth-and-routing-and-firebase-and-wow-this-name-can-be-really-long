// Can't use setState on superagent's result anymore.
// superagent will return a Requst object which is not automatically resolved with Redux
import request from 'superagent'
// when creating or logging in a user via Firebase, need to wait on the result of the call before proceeding
// If the promise resolves as a success, need to make sure the application knows that the user is logged in
// If it fails, need to pass along the error
import Firebase from 'firebase'

// action type
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const REQUEST_GIFS = 'REQUEST_GIFS'
export const SIGN_IN_USER = 'SIGN_IN_USER'
export const SIGN_OUT_USER= 'SIGN_OUT_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_USER = 'AUTH_USER'

const API_URL = 'http://api.giphy.com/v1/gifs/search?q='
const API_KEY = '&api_key=dc6zaTOxFJmzC'

const config = {
    apiKey: "AIzaSyA6D3vjEuek-1DHDkJakb1RdayATfnQvbo",
    authDomain: "w-giphy-search.firebaseapp.com",
    databaseURL: "https://w-giphy-search.firebaseio.com",
    projectId: "w-giphy-search",
    storageBucket: "w-giphy-search.appspot.com",
    messagingSenderId: "817597613911"
}

Firebase.initializeApp(config)

// ReduxPromise/Thunk are necessary because actions in Redux are synchronous: dispatch as soon as the
    // action creator is fired. That creates problems when the app needs to wait for the response of an external call
    // If the app didn't wait, the reducer would get a promise

// old action creator using redux-promise
    // With ReduxPromise, returned a promise as a payload when the action was dispatched
    // Then the middleware would resolve it and pass the result of the API call to the reducer
// export function requestGifs(term = null) {
//     // console.log(term)
//     const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}&limit=15`);
//     // the action
//     return {
//         type: REQUEST_GIFS,
//         payload: data
//     }
// }

// ReduxThunk forces the action creator to wait on dispatching the action object to the reducer until dispatch is called
// superagent is still returning a promise, but '.then(reponse => {})' resolves the promise,
    // giving the actual result of the call. Then dispatch the action with the resolved data
    // Instead of calling dispatch() with an action object to send to a reducer, can call dispatch with another action creator function

// action creator with ReduxThunk
export function requestGifs(term = null) {
    return function(dispatch) {
        request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
            dispatch ({
                type: REQUEST_GIFS,
                payload: response
            })
        })
    }
}

// since there are no asynchronous promises here, don't need any middleware transforming the data before the reducers
export function openModal(gif) {
    return {
        type: OPEN_MODAL,
        gif
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}


// These next two functions are functionally the sasme.
// The only difference is the name of the FIrebase method used
    // Like requestGifs, using ReduxThunk to pass email and password from forms to Firebase
export function signUpUser (credentials) {
    return function(dispatch) {
        Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser())
            })
            .catch(error => {
                console.log(error)
                dispatch(authError(error))
            })
    }
}

export function signInUser(credentials) {
    return function (dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser())
            })
            .catch(error => {
                dispatch(authError(error))
            })
    }
}

// 
export function signOutUser() {
    return function (dispatch) {
        Firebase.auth().signOut()
            .then(() => {
                dispatch({
                    type: SIGN_OUT_USER
                })
            })
    }
}

// Without this: If you reload the page, it would show the user as logged out, even
    // though the authentication info is still in localStorage
    // Reloading the page appears as if the user is logging out because 'authenticated' is set to the default of 'false'
    // so call this function to check the authentication state with the data Firebase is storing for us
export function verifyAuth() {
    return function (dispatch) {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(authUser())
            } else {
                dispatch(signOutUser())
            }
        })
    }
}

// export function signInUser() {
//     return {
//         type: SIGN_IN_USER
//     }
// }
    // Instead of SIGN_IN_USER, have AUTH_USER
    // Whether the user is created or signed in, for both we want the application to know that a user
        // is now authenticated. So we can have a dual-purpose action that can be used for both.
export function authUser() {
    return {
        type: AUTH_USER
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
