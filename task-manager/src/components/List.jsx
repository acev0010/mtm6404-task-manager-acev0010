import { useEffect } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import { groceries, household } from "../lists";

const List = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log("This is the id", id);
    }, []);
    return (
        <div>
            <Navigation />
            {id === "groceries" && groceries.map((item) => <div>{item.task}</div>)}
            {id === "household" && household.map((item) => <div>{item.task}</div>)}
        </div>
    )
}

export default List;