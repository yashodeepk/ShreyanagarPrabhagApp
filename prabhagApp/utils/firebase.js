import * as firebase from 'firebase';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLGjjgvcBC0JdJ1Xf0G1pNv0-wXKdvWGk",
  authDomain: "shreyanagarapp.firebaseapp.com",
  databaseURL: "https://shreyanagarapp.firebaseio.com",
  projectId: "shreyanagarapp",
  storageBucket: "shreyanagarapp.appspot.com",
  messagingSenderId: "505438830650",
  appId: "1:505438830650:web:e62197448cc967732eb503",
  measurementId: "G-SSEQ1FWR2C"
};

firebase.initializeApp(firebaseConfig);

export default firebase;