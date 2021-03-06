import React from "react";
import { auth } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  console.log(auth);
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div
            className="img-wrap"
            key={doc.id}
            onClick={() => {
              setSelectedImg(doc.url);
            }}
          >
            <img src={doc.url} alt="uploadedImage" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
