import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwcMPNGtd7IxgOQUA59TUgK5PsRNTsIME",
  authDomain: "meraki-211cd.firebaseapp.com",
  projectId: "meraki-211cd",
  storageBucket: "meraki-211cd.appspot.com",
  messagingSenderId: "165868546511",
  appId: "1:165868546511:web:e96ef4a5824e12fe44caba"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;