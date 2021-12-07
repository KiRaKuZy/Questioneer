import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCchP4p4PNJuuPnS-Zdh6l-XC6IcOGNIUs",
  authDomain: "questioneer-3a1e5.firebaseapp.com",
  projectId: "questioneer-3a1e5",
  storageBucket: "questioneer-3a1e5.appspot.com",
  messagingSenderId: "245318048893",
  appId: "1:245318048893:web:58059d02ec3fa9f676a514"
};

let app = Firebase.initializeApp(config);
export const db = app.database();
export const firebaseAuth = app.auth();
