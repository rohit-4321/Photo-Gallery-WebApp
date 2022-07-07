import React from "react";
import GoogleButton from "react-google-button";
import { useState } from "react";
import { LogInState } from "./AuthState";

export const Login = ({ onSignUpClick, signInWithGoogle, logIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authState, setAuthState] = useState(LogInState.idle);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ubmit");
    logIn(email, password, setAuthState);
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h1>LogIn</h1>
      <EmailField email={email} setEmail={setEmail} />
      <PasswordField
        password={password}
        setPassword={setPassword}
        authState={authState}
      />
      <button type="submit">
        <p>Log In</p>
      </button>
      <h1 id="or">OR</h1>
      <GoogleButton onClick={signInWithGoogle} />
      <span>
        Create account? <a onClick={onSignUpClick}>SignIn</a>
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
        {authState === LogInState.userNotFoundError
          ? "User not found"
          : authState === LogInState.passwordNotMatchError
          ? "password does not match"
          : ""}
      </p>
    </div>
  );
};
