import { createStore, compose, applyMiddleware } from 'redux'
// ReduxPromise is a middleware.
// Middleware functions are a layer added between a request and a response that perform some sort of check or transformation on data
// Used here to resolve a promise. If redux-promise receives a promise as a payload from an action, it will dispatch the resolved value of that promise.
import ReduxPromise from 'redux-promise'
import rootReducer from '../reducers'

// need to change the devToolsExtension 'undefined' to 'f => f' since you can't put undefined into compose
// any promise returned from actions should be fully resolved with line15 and below
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose (
            applyMiddleware(ReduxPromise),
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

    return store
}
