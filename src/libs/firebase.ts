import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {

    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  
    messagingSenderId: process.env.REACT_APP_FIREBASE_APPID,
  
    appId: "1:224332466595:web:7b63d08c05e13543b0f216"
  
  };

  const firebaseApp = initializeApp(firebaseConfig)

  export const storage = getStorage(firebaseApp)
  