import { getApps, initializeApp, getApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import firebaseConfig from 'src/config/firebase.config'
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

if (!getApps.length) {
  initializeApp(firebaseConfig)
  if (typeof window !== 'undefined') {
    if ('measurementId' in firebaseConfig) {
      getAnalytics()
    }
  }
}

class AuthService {
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp)
  }

  waitForUser(callback) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred)
    })
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCred) => {
        return {
          user: userCred.user,
        }
      })
      .catch((error) => {
        return {
          error: error.message,
        }
      })
  }
  async logout() {
    await signOut(this.auth)
  }
}

export default new AuthService(getApp())
