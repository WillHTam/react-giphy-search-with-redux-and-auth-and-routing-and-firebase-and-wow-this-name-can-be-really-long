import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Redirect } from 'react-router-dom'
// import the history object created in configureStore
import { history } from './../store/configureStore'
import { connect } from 'react-redux'

import Header from '../containers/Header'
import Home from '../containers/Home'
import Signup from '../containers/Signup'
import Login from '../containers/Login'
import Favorites from '../containers/Favorites'

// Two functions that return Route components
// Pass through a component, and check whether the user is authenticated, then return
    // either the component passed in as an argument, or redirect to /login or /favorites
const PrivateRoute = ({component: Component, authenticated, ...props}) => {
    // restricted to authenticated users
    return (
        <Route
            {...props}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location }}} />}
        />
    )
}

const PublicRoute = ({component: Component, authenticated, ...props}) => {
    // restricted to users who are not logged in
    return (
        <Route
            {...props}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/favorites' /> }
        />
    )
}


// Wrapping code in ConnectedRouter and pass it the history object
// sees the text after '/' and uses it as the path for the respective component
// exact means that the path contains exactly "/"
// Use PrivateRoute and PublicRoute, and pass in whether or not the user is authenticated from the store
class App extends React.Component {
    render() {
        return(
            <ConnectedRouter history={history}>
                <div>
                    <Header />

                    <div>
                        <Route exact path="/" component={ Home } />
                        <PublicRoute authenticated={this.props.authenticated} path="/signup" component={ Signup } />
                        <PublicRoute authenticated={this.props.authenticated} path="/login" component={ Login } />
                        <PrivateRoute authenticated={this.props.authenticated} path="/favorites" component={ Favorites } />
                    </div>

                </div>
            </ConnectedRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App)
