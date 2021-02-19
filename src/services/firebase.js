import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCAeVmhI8jItHqvpBuMetIFRvDxW9j_F4Q",
    authDomain: "buddyschat-426e8.firebaseapp.com",
    databaseURL: "https://buddyschat-426e8-default-rtdb.firebaseio.com"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();