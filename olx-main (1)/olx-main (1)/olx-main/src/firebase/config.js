import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBcPYhygMvb1EI2l03pu_PD-cYuAPVV7og",
  authDomain: "olx-clone-final-9d4d8.firebaseapp.com",
  databaseURL: "https://olx-clone-final-9d4d8-default-rtdb.firebaseio.com",
  projectId: "olx-clone-final-9d4d8",
  storageBucket: "olx-clone-final-9d4d8.appspot.com",
  messagingSenderId: "596136894618",
  appId: "1:596136894618:web:83d0dae72fc4fef5003f23",
  measurementId: "G-3549SVDM4H"
  };

  export const Firebase= firebase.initializeApp(firebaseConfig)//named export