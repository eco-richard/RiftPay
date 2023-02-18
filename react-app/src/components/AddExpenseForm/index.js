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
    const createdAt = new Date();
    const stringDate = createdAt.toISOString().slice(0,10)
    console.log('stringdate:', stringDate)

    // console.log("Friends: ", friends);
    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])


    //form render state variables
    const [equalPaymentsForm, setEqualPaymentsForm] = useState()
    console.log('qualPaymentsForm', equalPaymentsForm)
    const [exactPaymentsForm, setExactPaymentsForm] = useState()
    console.log('exactPaymentsForm', exactPaymentsForm)
    const [percentPaymentsForm, setPercentPaymentsForm] = useState()
    console.log('percentPaymentsForm', percentPaymentsForm)

    const onClickEqual = () => {
        setExactPaymentsForm(false);
        setPercentPaymentsForm(false);
        setEqualPaymentsForm(true);
        setCreationMethod("Equal");
        // setDebtInput(debtorObj)
    }

    const onClickExact = () => {
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(false);
        setExactPaymentsForm(true);
        setCreationMethod("Unequal")
        setDebtInput({})
    }

    const onClickPercent = () => {
        setExactPaymentsForm(false);
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(true);
        setCreationMethod("Unequal")
        setDebtInput({})
    }

    // Hooks for form input
    const [cost, setCost] = useState("");
    let costLength = cost.length
    const [creationMethod, setCreationMethod] = useState("Equal");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png")
    // const [createdAt, setCreatedAt] = useState("");
    //default should be a string interpolation using methid that gets you current time
    const [participants, setParticipants] = useState([user.id]);
    let participantsLength = participants.length;
    const [repayments, setRepayments] = useState('')
    // console.log('participants:', participants);
    // const [debtInputs, setDebtInputs] = useState([]);
    // console.log('debtInputs:', debtInputs);
    // const [debtAggregate, setDebtAggregate] = useState(0)
    //will be the aggregate of what is being paid back, displayed in the split modal so the user know its all adds up to cost
    // const [participantsLoans, setParticipantsLoans] = useState([]);
    const [errors, setErrors] = useState([]);
    const [openSplitModal, setOpenSplitModal] = useState(false);

    const paymentTypeModalClick = () => {
        setOpenSplitModal(!openSplitModal);
        setEqualPaymentsForm(true);
        // setDebtInput(debtorObj)
    }

    //for updating debt input state variable
    // for (let i = 0; i < participantsLength; i++) {
    //     participantsLoans.push(participants[i]);
    // }
    // console.log('participantsLoans', participantsLoans)
    let debtorObj = {};


    // participants.forEach((debtor) => {
    //     debtorObj[debtor] = "";
    // });
    // console.log('debtorObj:',debtorObj);
    const [debtInput, setDebtInput] = useState({});
    console.log('debtInput:', debtInput)
    // const [debtorObjState, setDebtorObjState] = useState(debtorObj)
    // console.log('debtorObj outside function:', debtorObj)
    // let inputName = 0;

    const handleUserInputChange = (e) => {
        const participant = e.target.name;
        const newDebtValue = e.target.value;
        // debtorObj[participant] = newDebtValue;
        // console.log('debtorObj in user input change:', debtorObj)
        setDebtInput({...debtInput, [participant]: newDebtValue})
        // console.log('name:', participant)
        // console.log('newdebtvalue:', newDebtValue)
    };

    const [debtSum, setDebtSum] = useState('')
    // console.log('debtsum:', parseInt(debtSum))
    // console.log('cost-debtsum:', parseInt(cost)-debtSum)
    useEffect(() => {
        let sum = 0;
        for (let i in debtInput) {
            // console.log('i', i, 'i in debtInput', debtInput[i])
            if (debtInput[i].length === 0) {
                debtInput[i] = 0
            }
            sum += parseInt(debtInput[i])
        }
        console.log('sum:', sum)
        setDebtSum(sum)
        console.log('debt input in use effect:', debtInput)
        if (splitText === 'equally') {
            setRepayments(exactPayments(creator, participants, debtInput, cost))
            console.log('in if repayments:', repayments)
        }
        else if (exactPaymentsForm) {
            setRepayments(exactPayments(creator, participants, debtInput, cost))
        }
        else {
            setRepayments(percentPayments(creator, participants, debtInput, cost))
        }
    }, [debtInput])

     //everytime there is a cost or participants input change, calculate equal share
    useEffect(() => {
        for (let i = 0; i < participantsLength; i++) {
            // let debtorObj = {};
            debtorObj[participants[i]] = `${cost/participantsLength}`
            setDebtInput(debtorObj)
            // console.log('debtorobj in useeffect:', debtorObj)
        }
    }, [costLength, participantsLength, exactPaymentsForm])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // Validation checking
        // if (splitText === 'equally') {
        //     setRepayments(exactPayments(creator, participants, debtInput, cost))
        //     console.log('in if repayments:', repayments)
        // }
        // else if (exactPaymentsForm) {
        //     setRepayments(exactPayments(creator, participants, debtInput, cost))
        // }
        // else if (percentPaymentsForm) {
        //     setRepayments(percentPayments(creator, participants, debtInput, cost))
        // }
        // else {
        //     //error here
        // }
        console.log('repayments:', repayments)

        const newTransaction = {
            cost,
            creation_method: creationMethod,
            description,
            note,
            image,
            created_at:stringDate,
            payers:`${user.id}/${cost}`,
            repayments
        }
        console.log('new transaction', newTransaction)

        const response = await dispatch(createTransaction(newTransaction))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    // console.log(data.errors)
                    if (data && data.errors) setErrors(data.errors);
                    // else if (data && data.title.includes('Error')) setErrors([data.message]);
                }
            );

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
        // console.log(person)
        return `${person.first_name} ${person.last_name}`
    }

    let splitText = exactPaymentsForm || percentPaymentsForm ? "unequally" : "equally";
    // Debugging useEffect
    // useEffect(() => {
    //     console.log("Participants: ", participants);
    // }, [participants])

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
                    required
                />
            </div>
            <div className="form-amount-div">
                $<input
                    className="form-amount"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="0.00"
                    required
                />
            </div>
            <div className="form-payment-option-div">
                Paid by you and split <button className="payment-option-button" type="button" onClick={paymentTypeModalClick}>{splitText}</button>
            </div>
            <div className="form-cancel-save-div">
                <button className="cancel-button" onClick={closeModal}>Cancel</button>
                <button className="save-button" type="submit">Save</button>

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
                    <>
                        <div className="equal-repayments">
                            {participants.map(participant => (
                                <div className="single-debtor">
                                    <div>{getParticipantName(participant)}</div>
                                    <div>${debtInput[participant]}</div>
                                </div>
                                ))}
                        </div>
                        <div className="aggregate-repayment">
                            <div className="total-repayment">TOTAL</div>
                            <div className="repayment-versus-cost">
                                ${debtSum}
                                ${parseInt(cost) - debtSum} left
                            </div>
                        </div>
                    </>
                )}
                {exactPaymentsForm && (
                    <>
                        <form className="exact-repayments">
                        {participants.map(participant => (
                            <div className="single-debtor">
                                <div>{getParticipantName(participant)}</div>
                                <div className="debt" key={participant}>
                                    <label> $
                                    <input
                                        className="debt-amount"
                                        type="number"
                                        value={debtInput[participant] || ''}
                                        name={participant}
                                        onChange={handleUserInputChange}
                                        // placeholder={cost/participants.length}
                                    />
                                    </label>
                                </div>
                            </div>
                            ))}
                        </form>
                        <div className="aggregate-repayment">
                            <div className="total-repayment">TOTAL</div>
                            <div className="repayment-versus-cost">
                                ${debtSum}
                                ${parseInt(cost) - debtSum} left
                            </div>
                        </div>
                    </>
                )}
                {percentPaymentsForm && (
                    <>
                        <form className="percent-repayments">
                        {participants.map(participant => (
                            <div className="single-debtor">
                                <div>{getParticipantName(participant)}</div>
                                <div className="debt">
                                    <label> %
                                    <input
                                        className="debt-amount"
                                        type="number"
                                        value={debtInput[participant] || ''}
                                        name={participant}
                                        onChange={handleUserInputChange}
                                        // placeholder={cost/participants.length}
                                    />
                                    </label>
                                </div>
                            </div>
                            ))}
                        </form>
                        <div className="aggregate-repayment">
                            <div className="total-repayment">TOTAL</div>
                            <div className="repayment-versus-cost">
                                %{debtSum}
                                %{parseInt(cost) - debtSum} left
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>)}
        </div>
        </>
    );
}
