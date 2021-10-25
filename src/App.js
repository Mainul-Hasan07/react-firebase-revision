import { GoogleAuthProvider, getAuth, signInWithPopup,signOut,GithubAuthProvider,FacebookAuthProvider,TwitterAuthProvider  } from 'firebase/auth';
import initializeAuthentication from './Firebase/firebase.initialize';
import './App.css';
import { useState } from 'react';
import Email from './components/EmailAuth/Email';


initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        console.log(result.user);
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }


  const handleFacebookSignin = () => {
    signInWithPopup(auth,facebookProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        console.log(result.user);
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedUser);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const handleTwitterSignin = () => {
    signInWithPopup(auth, twitterProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
      console.log(error.message);
    })
  }

  return (
    <div className="App">
      <Email></Email>
      {!user.name ?
        <div>
      <button onClick={handleGoogleSignin}>Google Sign In</button>
          <button onClick={handleGithubSignin}>Sign In with Github</button>
          <button onClick={handleFacebookSignin}>Sign In with Facebook</button>
          <button onclick={handleTwitterSignin}>Sign In with Twitter</button>
      </div> :
      <button onClick={handleSignOut}>Sign Out</button>
      }
      {
        user.name && <div>
          <h3>Name : {user.name}</h3>
          <p>Address : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
