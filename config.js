// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //"https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
 //import { getAnalytics } from "firebase/analytics";//https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";

import { getFirestore } from "firebase/firestore";//'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
import { getStorage } from "firebase/storage";//"https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js"; 

//import { get } from "http";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAHvBVy8dEye1QZYmkWaZhS93yYDiPZSk8",
  authDomain: "hacksoff-11645.firebaseapp.com",
  databaseURL: "https://hacksoff-11645-default-rtdb.firebaseio.com",
  projectId: "hacksoff-11645",
  storageBucket: "hacksoff-11645.appspot.com",
  messagingSenderId: "51363481835",
  appId: "1:51363481835:web:e17a2567810b47c17716ae",
  measurementId: "G-BYB6MJ8K25"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage(firebase);
//const analytics = getAnalytics(app);
console.log("Firebase initialized!");
export { firebase,db,storage};