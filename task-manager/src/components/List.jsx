import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import { getFirestore, collection, doc, getDocs, deleteDoc } from "firebase/firestore";

const List = ({ onListDeleted, db }) => {
  const { id } = useParams();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchListItems = async () => {
      const querySnapshot = await getDocs(collection(db, "lists", id, "items"));
      const items = querySnapshot.docs.map(doc => doc.data());
      setMyList(items);
    }
    fetchListItems();
  }, [db, id]);

  const handleListItemDeleted = async (itemId) => {
    try {
      await deleteDoc(doc(collection(db, "lists", id, "items"), itemId));
      setMyList(myList.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleListDeleted = async () => {
    try {
      const listRef = doc(collection(db, "lists"), id);
      const querySnapshot = await getDocs(collection(listRef, "items"));
      const batch = db.batch();
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      batch.delete(listRef);
      await batch.commit();
      onListDeleted(id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <Navigation onListDeleted={handleListDeleted} db={db} />
      {myList?.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <button onClick={() => handleListItemDeleted(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};


export default List;
