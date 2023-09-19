import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { docs } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDvvCdt8pUPuEV2_Kx99XSRDuZnTlhxB3A",
    authDomain: "discord-clone-1cd19.firebaseapp.com",
    projectId: "discord-clone-1cd19",
    storageBucket: "discord-clone-1cd19.appspot.com",
    messagingSenderId: "503761000656",
    appId: "1:503761000656:web:fe650a5d996b690933e6d5",
    measurementId: "G-E2B4R4CNZ4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;