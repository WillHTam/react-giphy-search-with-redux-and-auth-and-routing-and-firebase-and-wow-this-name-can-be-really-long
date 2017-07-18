##Sign Up / Login
- User fills out sign up / login form
- Firebase creates a new user or signs them in, with the credentials sent in by the form
- FIrebase sends back either an error object or a userData object

##Success
- Firebase saves its authentication token to our browser's localStorage(so that it persists when the page is refreshed)
- The 'authUser' action creator is dispatched, and the Redux store is updated to set authenticated to true

##Error
- Send the error message returned from Firebase to the authError action so that it can be displayed to the user


