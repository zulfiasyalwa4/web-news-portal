import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleprovider } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';

function Signin() {

  const navigate = useNavigate();

  const googleSignIn = () => {
    try {
      signInWithPopup(auth, googleprovider);
      auth.currentUser && navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
   
   
    <div className="container items-center p-3 my-5 d-flex flex-column w-50" style={{minWidth: '300px'}}>

      <div className="my-3 font-extrabold text-center font-2xl">
        <h2>Sign in</h2>
      </div>

      <button type="submit" className="pt-10 btn btn-primary"onClick={googleSignIn}>Sign in</button>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className="mx-auto d-flex justify-content-between" style={{width: '40%'}}>
          <button type="button" className="m-1 btn btn-light">
            <i className="bi bi-facebook"></i>
          </button>

          <button type="button" className="m-1 btn btn-light">
            <i className="bi bi-twitter"></i>
          </button>

          <button type="button" className="m-1 btn btn-light">
            <i className="bi bi-google"></i>
          </button>

          <button type="button" className="m-1 btn btn-light">
            <i className="bi bi-github"></i>
          </button>

        </div>
      </div>

    </div>
    
  );
}
export default Signin;
