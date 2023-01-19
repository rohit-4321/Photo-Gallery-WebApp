import { useContext, useEffect, useState } from "react";

import { projectFirestore } from "../firebase/config";
import { UserContext } from "../provider/UserProvider";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  const user = useContext(UserContext);
  useEffect(() => {
    if (user) {
      const unsub = projectFirestore
        .collection("users")
        .doc(user.uid)
        .collection(collection)
        .orderBy("createdAt")
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });

      return () => {
        unsub();
        console.log("Unsubscribe listener...");
      };
    }
  }, [collection, user]);

  return { docs };
};
export default useFirestore;

export const FireStoreDelete = (docId) => {
  const user = useContext(UserContext);
    if (user) {
        projectFirestore
        .collection("users")
        .doc(user.uid)
        .collection("images")
        .doc(docId)
        .delete()
        .then(()=> {
          console.log('delted')
        })
    }
}
