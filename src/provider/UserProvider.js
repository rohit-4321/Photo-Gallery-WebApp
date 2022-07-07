import React, { useEffect, useState, createContext } from "react";

import { auth } from "../firebase/config";

export const UserContext = createContext({ user: null });

export default ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("state changes............................................");
      if (user) {
        const { displayName, email, uid } = user;
        console.log("User in User Provider = " + user);
        setUser({
          displayName,
          email,
          uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
