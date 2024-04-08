import AddItem from "./firebaseComponents/AddItem";
import ShowItem from "./firebaseComponents/ShowItem";
import DeleteItem from "./firebaseComponents/DeleteItem";
export default function FirebasePage() {
    return (
        <div>
            <AddItem></AddItem>
            <ShowItem></ShowItem>
            <DeleteItem></DeleteItem>
        </div>
    );
}
