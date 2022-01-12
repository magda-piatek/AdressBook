import keys from './keys'

const firebase = require('firebase')

require('dotenv').config()

firebase.initializeApp(keys.firebaseConfig)

export default firebase.firestore()
