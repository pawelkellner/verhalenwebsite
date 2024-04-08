import AddItem from "./firestoreComponents/AddItem";
import ShowItem from "./firestoreComponents/ShowItem";
import DeleteItem from "./firestoreComponents/DeleteItem";
import EditItem from "./firestoreComponents/EditItem";

export default function FirebasePage() {
    return (
        <div>
            <AddItem></AddItem>
            <ShowItem></ShowItem>
            <EditItem></EditItem>
            <DeleteItem></DeleteItem>
        </div>
    );
}
