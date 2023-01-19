import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import UploadForm from "./UploadForm";
import ImageGrid from "./imageGrid";
import Modal from "./Modal";
import { UserContext } from "../provider/UserProvider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/config";

export const DashBoard = () => {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) {
      setredirect("/");
    }
  }, [user]);
  if (redirect) {
    navigator(redirect);
  }
  

  return (
    <div className="App">
      <Title />
      <button className="logOut" onClick={logOut}>
        <span>Log Out</span>
      </button>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg}/>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      
    </div>
  );
};
