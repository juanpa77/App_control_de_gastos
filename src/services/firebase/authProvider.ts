import { getAuth, GoogleAuthProvider, NextOrObserver, onAuthStateChanged, signInWithPopup, User } from 'firebase/auth'
import { firebaseApp } from './config'

export const provider = new GoogleAuthProvider()

const auth = getAuth(firebaseApp);

export const signWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      // const user = result.user;
    }).catch((error) => {
      console.log(error)
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
}

export const signOff = () => auth.signOut()

export const observerAuth = (collback: NextOrObserver<User>) => onAuthStateChanged(auth, collback)
