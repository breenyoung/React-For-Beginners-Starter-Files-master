import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyChY7TlraNvSwznIq7xevkt5OUph1I2xHY",
    authDomain: "catch-of-the-day-by.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-by.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export (not 'default')
export { firebaseApp };


export default base;