import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadFriendsThunk } from "../../store/friends";
import './AddExpenseForm.css'

export default function AddExpenseForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const friends = Object.values(useSelector(state => state.friends.friends))

    console.log("Friends: ", friends);
    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])

    // Hooks for form input
    const [cost, setCost] = useState(0);
    const [creationMethod, setCreationMethod] = useState("EQUAL");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png")
    const [createdAt, setCreatedAt] = useState("");
    const [participants, setParticipants] = useState([])
    const [debts, setDebts] = useState([])
    const [participantsLoans, setParticipantsLoans] = useState([])
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation checking
    }


    if (friends.length === 0) return null;

    return (
        <div className="add-expense-form-wrapper">
        <form onSubmit={handleSubmit} onClick={closeModal}>
            <select 
                value={participants} 
                multiple="true"
                onChange={(e) => {setParticipants(participants => [...participants, ])}}>
                {friends.map(friend => (
                    <option value={friend.id}>{`${friend.first_name} ${friend.last_name}`}</option>
                ))}
            </select>
        </form>
        </div>
    );
}