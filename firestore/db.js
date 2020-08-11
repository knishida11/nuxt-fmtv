import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.PROJECT_ID,
    messagingSenderId: process.env.STORAGE_BUCKET,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  })
  .firestore()
