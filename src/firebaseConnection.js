import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6XVeeGEvvyetv6NKWovvrT_nYHvf7CxE",
    authDomain: "atividade-af31a.firebaseapp.com",
    projectId: "atividade-af31a",
    storageBucket: "atividade-af31a.appspot.com",
    messagingSenderId: "136639513992",
    appId: "1:136639513992:web:38dd2ac74b733d7110263d",
    measurementId: "G-E9FXQLQVVC"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  export { db };