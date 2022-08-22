const initAuth = () => {
  const CLIENT_ID = '1076560920533-h9pn4b74lqdo374bk715id3rfiee6mvn.apps.googleusercontent.com'
  return window.gapi.auth2.init({
    client_id: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    plugin_name: 'Roarspot',
  })
}

export const checkSignedIn = () => {
  return new Promise((resolve, reject) => {
    initAuth()
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance()
        resolve(auth.isSignedIn.get())
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const onSuccess = (googleUser) => {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
}

const onFailure = (error) => {
  console.error(error)
}

export const renderButton = () => {
  window.gapi.signin2.render('signin-button', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: onSuccess,
    onfailure: onFailure,
  })
}

export const signOut = () => {
  window.gapi.auth2.getAuthInstance().signOut()
}
