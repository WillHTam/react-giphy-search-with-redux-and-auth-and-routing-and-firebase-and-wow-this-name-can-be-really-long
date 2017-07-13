import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
// import the history object created in configureStore
import { history } from './../store/configureStore'

import Header from '../containers/Header'
import Home from '../containers/Home'
import Signup from '../containers/Signup'
import Login from '../containers/Login'
import Favorites from '../containers/Favorites'

// Wrapping code in ConnectedRouter and pass it the history object
// sees the text after '/' and uses it as the path for the respective component
// exact means that the path contains exactly "/"
export default class App extends React.Component {
    render() {
        return(
            <ConnectedRouter history={history}>
                <div>
                    <Header />

                    <div>
                        <Route exact path="/" component={ Home } />
                        <Route path="/signup" component={ Signup } />
                        <Route path="/login" component={ Login } />
                        <Route path="/favorites" component={ Favorites } />
                    </div>

                </div>
            </ConnectedRouter>
        )
    }
}
