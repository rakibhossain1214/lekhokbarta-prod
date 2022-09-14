const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

// exports.AddUserToDb = functions.auth.user().onCreate((user) => {
//   const userInfo = {
//     displayName: user.providerData[0].displayName,
//     email: user.providerData[0].email,
//     photoURL: user.providerData[0].photoURL,
//     providerId: user.providerData[0].providerId,
//     uid: user.uid,
//     profileCover: '',
//     messageIn: [],
//     messageOut: [],
//     notifications: [],
//     authorScore: 50,
//     earnedCoins: 0,
//     postConnect: 0,
//     totalPostCount: 0,
//     dailyPostCount: 0,
//     phoneNumber: '',
//     occupation: '',
//     company: '',
//     trxAccount: [],
//     address: '',
//     locationOnMap: '',
//     city: '',
//     country: '',
//     userType: 'regular',
//     authorType: 'regular',
//     advertiserType: 'regular',
//     followers: [],
//     following: [],
//     balance: 0,
//     trxHistory: [],
//     favoriteCategories: [],
//     favoriteTags: [],
//     socialAccounts: [],
//     createdAt: new Date(),
//     updatedAt: ''
//   }
//   db.collection('users').doc(user.uid).set(userInfo)
// })
