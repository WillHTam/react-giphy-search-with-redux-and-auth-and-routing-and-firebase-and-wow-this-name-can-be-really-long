import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const validate = values => {
    const errors = {}

      if (!values.email) {
        errors.email = "Please enter an email."
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = "Please enter a password."
      }

      if (!values.passwordConfirmation) {
        errors.passwordConfirmation = "Please enter a password confirmation."
      }

      if (values.password !== values.passwordConfirmation ) {
        errors.password = 'Passwords do not match'
      }

      return errors
}

class Signup extends React.Component {
    handleFormSubmit = (values) => {
        console.log(values)
        // this.props.signInUser(values)
        this.props.signUpUser(values)
    }

    // touched and error prevents the field from displaying an error field before anything was entered
        // add a ternary conditional, where if the field has an error, add the bootstrap class of 'has-error'
    // the function declaration pulls field.input, field.label, etc and automatically assigns them their own variables input, label, etc.
        // Creates the benefit of only neeing to write fieldset and label markup once
    // Line 42
        // When you wrap a component or stateless function, Field automatically passes it a number of props
        // These props include name,value, and event handlers like onFocus
        // By adding these props to the HTML input element with {...input}, you 'destructure'
        // the value of the input prop and merges in the values provided by the Field component
    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
          <label className="control-label">{label}</label>
          <div>
            <input {...input} placeholder={label} className="form-control" type={type} />
            {touched && error && <div className="help-block">{error}</div>}
          </div>
        </fieldset>
    )

    renderAuthenticationError() {
        if (this.props.authenticationError) {
            return <div className="alert alert-danger">{ this.props.authenticationError }</div>
        }
        return <div></div>
    }

    // for the input fields, passing in 'this.renderField' instead of 'input'
    // do so because renderField checks that all fields have a value, regex checks the email, and
        // checks that password and passwordConfirmation match
      render() {
        return (
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <h2 className="text-center">Sign Up</h2>

              { this.renderAuthenticationError() }

              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <Field name="email" type="text" component={this.renderField} label="Email" />
                <Field name="password" type="password" component={this.renderField} label="Password" />
                <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />

                <button action="submit" className="btn btn-primary">Sign up</button>
              </form>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticationError: state.auth.error
    }
}

// validate added as an argument here so that form information will be passed to FormReducer
export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'signup',
  validate
})(Signup))
