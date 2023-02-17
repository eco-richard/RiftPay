import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadFriendsThunk } from "../../store/friends";
import { exactPayments, equalPayments, percentPayments } from './split_options'
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
    const [cost, setCost] = useState("");
    const [creationMethod, setCreationMethod] = useState("EQUAL");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png")
    const [createdAt, setCreatedAt] = useState("");
    const [participants, setParticipants] = useState([user.id])
    const [debts, setDebts] = useState([])
    const [participantsLoans, setParticipantsLoans] = useState([])
    const [errors, setErrors] = useState([]);
    const [openSplitModal, setOpenSplitModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation checking
    }

    let splitText = openSplitModal ? "unequally" : "equally";
    // Debugging useEffect
    useEffect(() => {
        console.log("Participants: ", participants);
    }, [participants])

    const addParticipants = (e) => {
        if (participants.includes(e.target.value)) {
            const index = participants.indexOf(e.target.value)
            participants.splice(index, 1);
            setParticipants(participants)
        } else {
            setParticipants([...participants, e.target.value])
        }
    }
    if (friends.length === 0) return null;

    return (
        <>
        <div className="all-forms-container">
        <div className="add-expense-form-wrapper">
            <div className="add-expense-form-header">
                <div className="add-expense-form-title">Add an expense</div>
                <div className="add-expense-form-close-button">
                    <button onClick={closeModal}>X</button>
                </div>
            </div>
        <div className="add-expense-form-body-wrapper">
        <form onSubmit={handleSubmit} >
            <div className="participants-selection">
            <label>
                With you and:
            <select 
                value={participants} 
                multiple="true"
                onChange={(e) => addParticipants(e)}>
                {friends.map(friend => (
                    <option value={friend.id}>{`${friend.first_name} ${friend.last_name}`}</option>
                ))}
            </select>
            </label>
            </div>
            <div className="reciept-image">
            </div>
            <div className="form-description-div">
                <input 
                    className="form-description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description"
                />
            </div>
            <div className="form-amount-div">
                $<input
                    className="form-amount"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="0.00"
                />
            </div>
            <div className="form-payment-option-div">
                Paid by you and split <button className="payment-option-button" onClick={() => setOpenSplitModal(!openSplitModal)}>{splitText}</button>
            </div>
            <div className="form-cancel-save-div">
                <button className="cancel-button" onClick={closeModal}>Cancel</button>
                <button className="save-button" onClick={handleSubmit}>Save</button>

            </div>
        </form>
        </div>
        </div>
        {openSplitModal && (
        <div className="choose-split-options-div">
            <div className="add-expense-form-header">
                <div className="add-expense-form-title">Choose split options</div>
                    <div className="add-expense-form-close-button">
                        <button onClick={closeModal}>X</button>
                    </div>
            </div>
            <div className="choose-split-form-body">
                <div className="split-options-buttons-list">
                    <button onClick={equalPayments}>E</button>
                    <button onClick={exactPayments}>1.23</button>
                    <button onClick={percentPayments}>%</button>
                </div>
                <form className="repayments">
                    {participants.map(participant => (
                        <div className="single-debtor">
                            <div>{participant}</div>
                            <div className="debt">
                                <label> $
                                <input
                                    className="debt-amount"
                                    type="number"
                                    value={debts}
                                    onChange={(e) => setDebts(e.target.value)}
                                    placeholder={cost/participants.length}
                                />
                                </label>
                            </div>
                        </div>
                        ))}
                </form>
            </div>
        </div>)}
        </div>
        </>
    );
}