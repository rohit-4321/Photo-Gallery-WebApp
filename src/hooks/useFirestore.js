import { useEffect, useState } from "react";

import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
};
export default useFirestore;
