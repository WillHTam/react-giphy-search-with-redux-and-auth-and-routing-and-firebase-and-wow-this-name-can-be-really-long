import { createStore, compose, applyMiddleware } from 'redux'
// ReduxPromise is a middleware.
// Middleware functions are a layer added between a request and a response that perform some sort of check or transformation on data
// Used here to resolve a promise. If redux-promise receives a promise as a payload from an action, it will dispatch the resolved value of that promise.
import ReduxPromise from 'redux-promise'
import rootReducer from '../reducers'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import * as Actions from '../actions'

// history determines location from URL in Browser
// Now the store is aware of the browser location
export const history = createHistory()

// need to change the devToolsExtension 'undefined' to 'f => f' since you can't put undefined into compose
// any promise returned from actions should be fully resolved with line15 and below
// > removed the 'default' because history object needs to be available in other places
export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose (
            applyMiddleware(ReduxPromise, routerMiddleware(history)),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    // check the authentication state even on reloading the application
    store.dispatch(Actions.verifyAuth())

    return store
}
