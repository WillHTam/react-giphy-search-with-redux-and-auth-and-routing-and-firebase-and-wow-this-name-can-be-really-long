import React from 'react'
import { Field, reduxForm } from 'redux-form'

class Login extends React.Component {
    // also call this with handleSubmit
    // when this.props.handleSubmit() is called, it passes the value of the form as an argument to
        //whatever callback is supplied, in this case handleFormSubmit
    handleFormSubmit = (values) => {
        console.log(values)
    }

    // reduxForm()() makes handleSubmit available via this.props
    // handleSubmit is attached to onSubmit to let redux-form know that the user is
        // trying to submit the form so it can intercept and validate it
    render() {
        return  (
            <div className="container">
                <div className="col-md-6 col-md-offset-3">
                  <h2 className="text-center">Log In</h2>
                  <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                    <fieldset className="form-group">
                      <label>Email</label>
                      <Field name="email" component="input" className="form-control" type="text" placeholder="Email"/>
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Password</label>
                      <Field name="password" component="input" className="form-control" type="password" placeholder="Password"/>
                    </fieldset>

                    <button action="submit" className="btn btn-primary">Sign In</button>
                  </form>
                </div>
            </div>
        )
    }
}

// reduxForm()() also connects the form to reduxForm
// first parentheses takes a config object that has only one required argument
    // a unique name for the form, which will be the key for the store object returned from FormReducer
export default reduxForm({
    form:"login"
})(Login)
