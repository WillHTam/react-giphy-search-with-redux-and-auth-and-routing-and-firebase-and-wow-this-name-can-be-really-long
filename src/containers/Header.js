import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from '../actions'

// simply replace 'a' tags with 'Link' then
// react-router can switch the components around instead of reloading the page
class Header extends React.Component {
    // Since Header doesn't have any child components, can pass in Actions directly in order to make signOutUser()
        // available on this.props
    handleSignout() {
        this.props.signOutUser()
    }

    renderAuthLinks() {
        // extract out the logic necessary to render links into its own method
        // authenticated is available from AuthReducer via mapStateToProps
        // if authenticated==true, return the links to Favs and Sign Out
        // Return array of <li>'s because otherwise would have to wrap the li's in a single div,
            // which would not be very clean
        // Instead, return array of li's, given key prop so that they are unique
        // Sign Out is a normal a element because it is not routing but just calling handleSignout to fire the signOutUser() action
        if (this.props.authenticated) {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/favorites">My Favorites</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <a className="nav-link" href="#" onClick={() => this.handleSignout()}>Sign Out </a>
                </li>
            ]
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/login">Login</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ]
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">W's Giphy Search</Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        { this.renderAuthLinks() }
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, Actions)(Header)
