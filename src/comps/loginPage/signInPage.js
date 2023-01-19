import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase/config";
import { UserContext } from "../../provider/UserProvider";
import { LogInState, SignUpState } from "./AuthState";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const SignInPage = () => {
  const navigate = useNavigate();

  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  useEffect(() => {
    if (user) {
      setredirect("/dashboard");
    }
  }, [user]);
  if (redirect) {
    navigate("dashboard");
  }

  const [pageState, setPageState] = useState("login");


  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log("Sign IN = " + res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logInWithEmailAndPassword = (email, password, setLogInSate) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setLogInSate(LogInState.userNotFoundError);
        } else if (error.code === "auth/wrong-password") {
          setLogInSate(LogInState.passwordNotMatchError);
        }
        console.log(error.code);
      });
  };
  const signUpWithEmailAndPassword = (email, password, setSignUpState) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        if (err.code === "auth/weak-password") {
          setSignUpState(SignUpState.weakPassword);
        } else if (err.code === "auth/invalid-email") {
          setSignUpState(SignUpState.badEmail);
        }
      });
  };

  return (
    <div className="login-screen">
      {pageState === "login" ? (
        <Login
          onSignUpClick={() => {
            setPageState("signup");
          }}
          signInWithGoogle={signInWithGoogle}
          logIn={logInWithEmailAndPassword}
        />
      ) : (
        <SignUp
          onLogInClick={() => {
            setPageState("login");
          }}
          signUp={signUpWithEmailAndPassword}
          signInWithGoogle={signInWithGoogle}
        />
      )}
    </div>
  );
};
