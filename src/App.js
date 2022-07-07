import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashBoard } from "./comps/DashBoard";
import { SignInPage } from "./comps/loginPage/signInPage";
import UserProvider from "./provider/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
