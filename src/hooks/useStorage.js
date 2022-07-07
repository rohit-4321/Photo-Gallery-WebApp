import { useState, useEffect, useContext } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import { UserContext } from "../provider/UserProvider";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    const strorageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("users");

    strorageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const url = await strorageRef.getDownloadURL();
        const createdAt = timestamp();
        console.log(user);
        collectionRef
          .doc(user.uid)
          .collection("images")
          .add({ url, createdAt });

        setUrl(url);
      }
    );
  }, [file, user]);

  return { progress, url, error };
};

export default useStorage;
