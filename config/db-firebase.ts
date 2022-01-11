const firebase = require('firebase')

require('dotenv').config()

const configTest = {
  apiKey: process.env.API_KEY_TEST,
  authDomain: process.env.AUTH_DOMAIN_TEST,
  projectId: process.env.PROJECT_ID_TEST,
  storageBucket: process.env.STORAGE_BUCKET_TEST,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_TEST,
  appId: process.env.APP_ID_TEST,
  databaseURL: process.env.DATABASE_URL_TEST,
}

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  databaseURL: process.env.DATABASE_URL,
}

firebase.initializeApp(process.env.NODE_ENV === 'test' ? configTest : config)

export default firebase.firestore()
