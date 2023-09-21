import './App.css'

import firebase from 'firebase/compat/app'
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { useAuthState } from "react-firebase-hooks/auth"

import Loading from './components/Loading'
import Chatroom from './containers/Chatroom'

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBbOlRqB0fUV1o0qetcD_R9rUYoQNT8O4w",
    authDomain: "serverlesschat-c38ac.firebaseapp.com",
    projectId: "serverlesschat-c38ac",
    storageBucket: "serverlesschat-c38ac.appspot.com",
    messagingSenderId: "554620784680",
    appId: "1:554620784680:web:e2f99029f14dc595dfa51d",
    measurementId: "G-W34YPLS2QG"
  }
  const app = firebase.initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)

  const [user, loading] = useAuthState(auth)
  return (
    <>
      <SignOut auth={auth}/>
      {loading && <Loading/>}
      {user? <Chatroom db={firestore}/>: <SignIn auth={auth}/>}
    </>
  )
}

function SignOut({auth}: {auth: Auth}) {
  return auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
}

function SignIn({auth}: {auth: Auth}) {
  const useSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
      })
      .catch(err => {
        const errCode = err.code
        const errMsg = err.message
        const email = err.customData.email
        const credential = GoogleAuthProvider.credentialFromError(err)
        console.error(errCode, errMsg, email, credential)
      })
  }
  return <button className='SignIn' onClick={useSignInWithGoogle}>Sign In</button>
}

export default App
