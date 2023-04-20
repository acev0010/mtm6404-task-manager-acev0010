import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import { groceries, household } from "../lists";
import { useHistory } from "react-router";


const List = () => {
  const { id } = useParams();
  const [myList, setMyList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getMyList = localStorage.getItem(id);
    setMyList(JSON.parse(getMyList));
  }, [id]);

  return (
    <div>
      <Navigation />
      {myList?.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
      {/* {id === "school" && groceries.map((item) => <div>{item.task}</div>)}
            {id === "household" && household.map((item) => <div>{item.task}</div>)} */}
    </div>
  );
};

export default List;

