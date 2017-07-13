import React from 'react'
import { connect } from 'react-redux'
// Without Link, would have to do a full-page refresh to load new views
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a href="/" className="navbar-brand">Wombat Gif Search</a>
                </div>
                 <ul className="nav navbar-nav navbar-right">
                   <li className="nav-item">
                     <a className="nav-link" href="/login">Login</a>
                   </li>
                   <li className="nav-item">
                     <a className="nav-link" href="/signup">Sign Up</a>
                   </li>
                 </ul>
              </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

// Header needs to know whether to render Login/Signup or Favorites/SignOut
// Fire sign out action too, so it needs to be aware of state
export default connect(mapStateToProps)(Header)
