import {TKeys} from './typedf'

require('dotenv').config()

export const keysDev: TKeys = {
  firebaseConfig: {
    apiKey: process.env.API_KEY ?? '',
    authDomain: process.env.AUTH_DOMAIN ?? '',
    projectId: process.env.PROJECT_ID ?? '',
    storageBucket: process.env.STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.MESSAGING_SENDER_ID ?? '',
    appId: process.env.APP_ID ?? '',
    databaseURL: process.env.DATABASE_URL ?? '',
  },
  mongodbUrl: process.env.MONGO_URL ?? '',
}
