import React from "react";
import GoogleButton from "react-google-button";
import { useState } from "react";
import { SignUpState } from "./AuthState";

export const SignUp = ({ signUp, onLogInClick, signInWithGoogle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authState, setAuthState] = useState(SignUpState.idle);
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, setAuthState);
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h1>SignUp</h1>
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField
        password={password}
        setPassword={setPassword}
        authState={authState}
      />
      <button type="submit">
        <p>Create Account</p>
      </button>
      <h1 id="or">OR</h1>
      <GoogleButton
        onClick={() => {
          signInWithGoogle();
        }}
      />
      <span>
        Already have account? <p onClick={onLogInClick}>LognIn</p>
      </span>
    </form>
  );
};

const EmailField = ({ email, setEmail }) => {
  return (
    <div className="inputContainer">
      <p>Email</p>
      <input
        type="email"
        placeholder={`Enter your Email`}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>
  );
};

const PasswordField = ({ password, setPassword, authState }) => {
  return (
    <div className="inputContainer">
      <p>Password</p>
      <input
        type="password"
        placeholder={`Enter your Password`}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p className="pass-error">
        {authState === SignUpState.weakPassword
          ? "password should be atleast 6 charecter long"
          : authState === SignUpState.badEmail
          ? "Bad email format email"
          : ""}
      </p>
    </div>
  );
};
