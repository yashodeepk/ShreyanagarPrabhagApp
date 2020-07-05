import * as firebase from 'firebase';
import '@firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyCLGjjgvcBC0JdJ1Xf0G1pNv0-wXKdvWGk",
//   authDomain: "shreyanagarapp.firebaseapp.com",
//   databaseURL: "https://shreyanagarapp.firebaseio.com",
//   projectId: "shreyanagarapp",
//   storageBucket: "shreyanagarapp.appspot.com",
//   messagingSenderId: "505438830650",
//   appId: "1:505438830650:web:e62197448cc967732eb503",
//   measurementId: "G-SSEQ1FWR2C"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCrICHTXLCwOW18-4eHSdrVvVbxDbf38T4",
  authDomain: "todo-bca74.firebaseapp.com",
  databaseURL: "https://todo-bca74.firebaseio.com",
  projectId: "todo-bca74",
  storageBucket: "todo-bca74.appspot.com",
  messagingSenderId: "725269876596",
  appId: "1:725269876596:web:0a8167ee6b4cd4eba5a621",
  measurementId: "G-S8Z9G2GG5V"
}

firebase.initializeApp(firebaseConfig);

export default firebase;