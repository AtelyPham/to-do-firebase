import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBAlSLGxFsPZxvJrW7W2WXJBk2RDT3gtIU",
  authDomain: "my-first-project-187e3.firebaseapp.com",
  projectId: "my-first-project-187e3",
  storageBucket: "my-first-project-187e3.appspot.com",
  messagingSenderId: "228898097023",
  appId: "1:228898097023:web:e71db26030c6b93ef13c4a",
};
// Initialize Firebase
export var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export const auth = firebase.auth();

export var provider = new firebase.auth.GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   return firebase.auth().signInWithPopup(provider);
// };
// firebase
//   .auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /* @type {firebase.auth.OAuthCredential} */
//     var credential = result.credential;

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//     suss();
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//     err();
//   });
