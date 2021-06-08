import React, { Component } from 'react';
import LoginImg from '../../assets/login-page.jpg';
import GoogleImg from '../../assets/google.jpg';
import './Login.css';

class Login extends Component {
  render() {
    const hostname = window.location.hostname;
    return (
      <div id="LoginPage">
        <img id="LoginImg" src={LoginImg} alt="Login background"/>

        <div id="LoginInfo">
          <div id="SiteNameSlogan">
            <h1>Fat Be Gone!</h1>
            
          </div>
          <div id="LoginBtnWrapper">
            <a
              id="googleBtn"
              className="LoginBtns"
              href={`http://${hostname}:9000/auth/google`}>
                <img id="googleImg" src={GoogleImg} alt="google button"/>
                <p id="googleBtnText">Sign in with Google</p>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
