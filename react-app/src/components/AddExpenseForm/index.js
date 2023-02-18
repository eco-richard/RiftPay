import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadFriendsThunk } from "../../store/friends";
import { exactPayments, equalPayments, percentPayments } from './split_options'
import './AddExpenseForm.css'
import { createTransaction } from "../../store/transaction";

export default function AddExpenseForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const friends = Object.values(useSelector(state => state.friends.friends))
    const creator = user;

    console.log("Friends: ", friends);
    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])


    //form render state variables
    const [equalPaymentsForm, setEqualPaymentsForm] = useState()
    console.log(equalPaymentsForm)
    const [exactPaymentsForm, setExactPaymentsForm] = useState()
    console.log(exactPaymentsForm)
    const [percentPaymentsForm, setPercentPaymentsForm] = useState()
    console.log(percentPaymentsForm)

    const onClickEqual = () => {
        setExactPaymentsForm(false);
        setPercentPaymentsForm(false);
        setEqualPaymentsForm(true);
        setCreationMethod("EQUAL");
        // setDebtInput(debtorObj)
    }

    const onClickExact = () => {
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(false);
        setExactPaymentsForm(true);
        setCreationMethod("EXACT")
        setDebtInput(debtorObj)
    }

    const onClickPercent = () => {
        setExactPaymentsForm(false);
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(true);
        setCreationMethod("PERCENT")
        setDebtInput(debtorObj)
    }

    // Hooks for form input
    const [cost, setCost] = useState("");
    let costLength = cost.length
    const [creationMethod, setCreationMethod] = useState("EQUAL");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png")
    const [createdAt, setCreatedAt] = useState("");
    //default should be a string interpolation using methid that gets you current time
    const [participants, setParticipants] = useState([user.id]);
    let participantsLength = participants.length;
    console.log('participants:', participants);
    // const [debtInputs, setDebtInputs] = useState([]);
    // console.log('debtInputs:', debtInputs);
    const [debtAggregate, setDebtAggregate] = useState(0)
    //will be the aggregate of what is being paid back, displayed in the split modal so the user know its all adds up to cost
    const [participantsLoans, setParticipantsLoans] = useState([]);
    const [errors, setErrors] = useState([]);
    const [openSplitModal, setOpenSplitModal] = useState(false);

    const paymentTypeModalClick = () => {
        setOpenSplitModal(!openSplitModal);
        setEqualPaymentsForm(true);
        // setDebtInput(debtorObj)
    }

    //for updating debt input state variable
    const numDebts = participants.length;
    let debtorArr = [];
    for (let i = 0; i < numDebts; i++) {
        debtorArr.push(participants[i]);
    }
    let debtorObj = {};

    debtorArr.forEach((debtor) => {
        debtorObj[debtor] = "";
    });
    // console.log('debtorObj:',debtorObj);
    const [debtInput, setDebtInput] = useState(debtorObj);
    console.log('debtInput:', debtInput)
    // const [debtorObjState, setDebtorObjState] = useState(debtorObj)
    console.log('debtorObj outside function:', debtorObj)
    // let inputName = 0;

    const handleUserInputChange = (e) => {
        const participant = e.target.name;
        const newDebtValue = e.target.value;
        debtorObj[participant] = newDebtValue;
        console.log('debtorObj in user input change:', debtorObj)
        setDebtInput(debtorObj)
        console.log('name:', participant)
        console.log('newdebtvalue:', newDebtValue)
    };

     //everytime there is a cost or participants input change, calculate equal share
     useEffect(() => {
        for (let i = 0; i < participantsLength; i++) {
            debtorObj[participants[i]] = `${cost/participantsLength}`
            setDebtInput(debtorObj)
            console.log('debtorobj in useeffect:', debtorObj)
        }
    }, [costLength, participantsLength])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        // // Validation checking
        // let repayments;
        // if (equalPaymentsForm) {
        //     repayments = equalPayments(creator, participants, cost)
        // }
        // else if (exactPaymentsForm) {
        //     repayments = exactPayments(creator, participants, debtInputs, cost)
        // }
        // else {
        //     repayments = percentPayments(creator, participants, debtInputs, cost)
        // }

        // const newTransaction = {
        //     cost,
        //     creationMethod,
        //     description,
        //     note,
        //     image,
        //     createdAt,
        //     payers:`${user.id}/${cost}`,
        //     repayments
        // }


        // await dispatch(createTransaction(newTransaction))
        //     .then(closeModal)
        //     .catch(
        //         async (res) => {
        //             const data = await res.json();
        //             // console.log(data.errors)
        //             if (data && data.errors) setErrors(data.errors);
        //             // else if (data && data.title.includes('Error')) setErrors([data.message]);
        //         }
        //     );

    }

    const getParticipantName = (participant) => {
        let id = parseInt(participant);
        let person;
        if (id === user.id) {
            person = user
            return `${person.first_name} ${person.last_name}`
        }
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id === id) {
                person = friends[i]
            }
        }
        console.log(person)
        return `${person.first_name} ${person.last_name}`
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
                Paid by you and split <button className="payment-option-button" onClick={paymentTypeModalClick}>{splitText}</button>
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
                    <button onClick={onClickEqual}>E</button>
                    <button onClick={onClickExact}>1.23</button>
                    <button onClick={onClickPercent}>%</button>
                </div>
                {equalPaymentsForm && (
                    // <form className="equal-repayments">
                    <div className="equal-repayments">
                        {participants.map(participant => (
                            <div className="single-debtor">
                                <div>{getParticipantName(participant)}</div>
                                {/* <div>${Math.round(((cost/participants.length) + Number.EPSILON) * 100) / 100}</div> */}
                                <div>${debtInput[participant]}</div>
                                {/* {setDebtInput(debtorObj)} */}
                                {/* <div className="debt">
                                    <label> $
                                    <input
                                        className="debt-amount"
                                        type="number"
                                        value={cost/participants.length}
                                        onChange={(e) => setDebts(e.target.value)}
                                        // placeholder={cost/participants.length}
                                    />
                                    </label>
                                </div> */}
                            </div>
                            ))}
                    </div>
                    // {/* </form> */}
                )}
                {exactPaymentsForm && (
                    <form className="exact-repayments">
                    {participants.map(participant => (
                        <div className="single-debtor">
                            <div>{getParticipantName(participant)}</div>
                            <div className="debt" key={participant}>
                                <label> $
                                <input
                                    className="debt-amount"
                                    type="number"
                                    value={debtInput[participant] || debtorObj[participant]}
                                    name={participant}
                                    onChange={handleUserInputChange}
                                    // placeholder={cost/participants.length}
                                />
                                </label>
                            </div>
                        </div>
                        ))}
                </form>
                )}
                {percentPaymentsForm && (
                    <form className="percent-repayments">
                    {participants.map(participant => (
                        <div className="single-debtor">
                            <div>{getParticipantName(participant)}</div>
                            <div className="debt">
                                <label> %
                                <input
                                    className="debt-amount"
                                    type="number"
                                    value={debtInput[participant] || debtorObj[participant]}
                                    name={participant}
                                    onChange={handleUserInputChange}
                                    // placeholder={cost/participants.length}
                                />
                                </label>
                            </div>
                        </div>
                        ))}
                </form>
                )}
            </div>
        </div>)}
        </div>
        </>
    );
}
