import {TKeys} from './typedf'

require('dotenv').config()

export const keysTest: TKeys = {
  firebaseConfig: {
    apiKey: process.env.API_KEY_TEST ?? '',
    authDomain: process.env.AUTH_DOMAIN_TEST ?? '',
    projectId: process.env.PROJECT_ID_TEST ?? '',
    storageBucket: process.env.STORAGE_BUCKET_TEST ?? '',
    messagingSenderId: process.env.MESSAGING_SENDER_ID_TEST ?? '',
    appId: process.env.APP_ID_TEST ?? '',
    databaseURL: process.env.DATABASE_URL_TEST ?? '',
  },
  mongodbUrl: process.env.MONGO_URL_TEST ?? '',
}
