import React, { useContext, useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/config";
import { UserContext } from "../provider/UserProvider";

export const SignIn = () => {
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

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <GoogleButton onClick={signInWithGoogle} />;
};
