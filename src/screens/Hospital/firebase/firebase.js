import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyB4yxW3LklwGsHHMqWQXuR2GCSusqJ8Ubk",
  authDomain: "http://clirnetapp.appspot.com/",
  databaseURL: "https://clirnetapp.firebaseio.com/",
  projectId: "clirnetapp",
  storageBucket: "clirnetapp.appspot.com",
  messagingSenderId: "66526267590"
};

firebase.initializeApp(config)
export const auth = firebase.auth();
export default firebase;
