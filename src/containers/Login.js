import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as Actions from '../actions'

// for Login&SignUp, pass in Actions directly instead of using mapDispatchToProps or bindActionCreators to add our actions to props
    // bindActionCreators only needs to be used when passing action creators down as props from a container-fluid
    // to a component that is not aware of Redux. Since Login & Signup have no child components, can pass them into reduxForm()() directly

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = "Please enter an email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = "Please enter a password"
    }

    return errors
}

class Login extends React.Component {
    // also call this with handleSubmit
    // when this.props.handleSubmit() is called, it passes the value of the form as an argument to
        //whatever callback is supplied, in this case handleFormSubmit
    handleFormSubmit = (values) => {
        console.log(values)
        this.props.signInUser(values)
    }

    renderField = ({ input, label, type, meta: {touched, error} }) => (
        <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
            <label className="control-label">{label}</label>
            <div>
                <input {...input} placeholder={label} className="form-control" type={type} />
                {touched && error && <div className="help-block">{error}</div>}
            </div>
        </fieldset>
    )

    // reduxForm()() makes handleSubmit available via this.props
    // handleSubmit is attached to onSubmit to let redux-form know that the user is
        // trying to submit the form so it can intercept and validate it
    render() {
        return  (
            <div className="container">
                <div className="col-md-6 col-md-offset-3">
                  <h2 className="text-center">Log In</h2>
                  <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>

                    <Field name = "email"
                           component={this.renderField}
                           className="form-control"
                           type="text"
                           label="Email" />
                    <Field name ="password"
                           component={this.renderField}
                           className="form-control"
                           type="password"
                           label="Password" />

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
export default connect(null, Actions)(reduxForm({
    form: 'login',
    validate
})(Login))
