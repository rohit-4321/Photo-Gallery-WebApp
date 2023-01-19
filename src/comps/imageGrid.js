import React, { useEffect, useContext} from "react";
import { auth } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
// import { FireStoreDelete } from "../hooks/useFirestore";
import { projectFirestore } from "../firebase/config";
import { UserContext } from "../provider/UserProvider";
// import { AiFillDelete } from 'react-icons/fa';

const convertTime = (doc) => {
  if( doc.createdAt && doc.createdAt.seconds && doc.createdAt.nanoseconds){
  const time = new Date(doc.createdAt.seconds * 1000 + doc.createdAt.nanoseconds / 1000000);
  const tempTime = time.toString();
  const arr = tempTime.split(' ');
  console.log(arr);
  return `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`
  }
  return '--'; 
}
const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  const user = useContext(UserContext);
  console.log(auth);
  useEffect(() => {
    console.log(docs);
  },[docs]);
  const handleImageClick = (e, url) => {
    if(e.target.className === 'single-img'){
      setSelectedImg(url);
    }
  }
  const handleDeleteImg = (e, doc) => {
      console.log(doc.id);
      if (user) {
        projectFirestore
        .collection("users")
        .doc(user.uid)
        .collection("images")
        .doc(doc.id)
        .delete()
        .then(()=> {
          console.log('delted')
        })
    }
  }
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => {
          console.log(doc);
          const convertData = convertTime(doc);
          return (
            <div
              className="img-wrap"
              key={doc.id}
              onClick={(e) => {
                handleImageClick(e, doc.url);
              }}
            >
              <img src={doc.url} alt="uploadedImage" className="single-img" />
              <div className="overlay">
                <span className="img-name">Name: {doc.name}</span>
                <span className="createdAt">CreatedAt: {convertData}</span>
                <span className="delete-img" onClick={(e)=> {
                  handleDeleteImg(e, doc);
                }}>
                  {
                    doc.size && <span className="createdAt">
                      Size: {doc.size / 1024} MB
                    </span>
                  }
                    <button>Delete</button>
                    {/* <AiFillDelete /> */}
                </span>
              </div>
            </div>
          )
        })}
    </div>
  );
};

export default ImageGrid;
