import React, { useEffect, useContext} from "react";
import { auth } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
// import { FireStoreDelete } from "../hooks/useFirestore";
import { projectFirestore } from "../firebase/config";
import { UserContext } from "../provider/UserProvider";
import { AiFillDelete } from 'react-icons/ai';
import { HiArrowsExpand } from 'react-icons/hi';

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
const ImgFields = ({fieldName, value}) => {
  return <div>
  <span className="img-field">
    {fieldName}:
  </span>
  <span className="img-value"> {value}</span>
  </div>
}
const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  const user = useContext(UserContext);
  console.log(auth);
  useEffect(() => {
    console.log(docs);
  },[docs]);
  const handleImageClick = (e, url) => {
    if(e.target.className === 'expand-img'){
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
            >
              <img src={doc.url} alt="uploadedImage" className="single-img" />
              <div className="overlay">
                <ImgFields fieldName={'Name'} value={doc.name}/>
                {/* <span className="img-name">Name: {doc.name}</span> */}
                <ImgFields fieldName={'CreatedAt'} value={convertData}/>
                {
                    doc.size && <ImgFields fieldName={'Size'} value={`${parseFloat(doc.size / 1024).toFixed(2)} MB`}/>
                }
                <span className="delete-img" onClick={(e)=> {
                  handleDeleteImg(e, doc);
                }}>
                    <AiFillDelete color="white" size={35} />
                </span>
                <span
                className="expand-img"
                onClick={(e) => {
                  handleImageClick(e, doc.url);
                }} >
                  <HiArrowsExpand
                  className="single-img"
                  color="white"
                  size={35}
                  />
                </span>
              </div>
            </div>
          )
        })}
    </div>
  );
};

export default ImageGrid;
