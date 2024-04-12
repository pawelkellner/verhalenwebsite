import AddItem from "../../components/firebase/firestoreComponents/AddItem";
import ShowItem from "../../components/firebase/firestoreComponents/ShowItem";
import DeleteItem from "../../components/firebase/firestoreComponents/DeleteItem";
import EditItem from "../../components/firebase/firestoreComponents/EditItem";
import AuthCreateAccount from "../../components/firebase/authComponents/AuthCreateAccount";
import AuthLogin from "../../components/firebase/authComponents/AuthLogin";
import AuthShowAccounts from "../../components/firebase/authComponents/AuthShowAccount";

export default function FirebasePage() {
    return (
        <div>
            <AddItem></AddItem>
            <ShowItem></ShowItem>
            <EditItem></EditItem>
            <DeleteItem></DeleteItem>
            <AuthCreateAccount></AuthCreateAccount>
            <AuthLogin></AuthLogin>
            <AuthShowAccounts></AuthShowAccounts>
        </div>
    );
}
