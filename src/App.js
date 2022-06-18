import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { DashBoard } from "./comps/DashBoard";
import { SignIn } from "./comps/signInPage";
import UserProvider from "./provider/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
