import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadFriendsThunk } from "../../store/friends";
import { exactPayments, percentPayments } from './split_options'
import './AddExpenseForm.css'
import { createTransaction, getAllTransactions } from "../../store/transaction";

export default function AddExpenseForm() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const friends = Object.values(useSelector(state => state.friends.friends))
    const creator = user;
    const creatorId = creator.id
    const createdAt = new Date();
    const stringDate = createdAt.toISOString().slice(0, 10)
    // console.log('stringdate:', stringDate)

    // console.log("Friends: ", friends);
    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])


    //form render state variables
    const [equalPaymentsForm, setEqualPaymentsForm] = useState()
    // console.log('qualPaymentsForm', equalPaymentsForm)
    const [exactPaymentsForm, setExactPaymentsForm] = useState()
    // console.log('exactPaymentsForm', exactPaymentsForm)
    const [percentPaymentsForm, setPercentPaymentsForm] = useState()
    // console.log('percentPaymentsForm', percentPaymentsForm)

    const debtInputReset = () => {
        for (let i in debtInput) {
            debtInput[i] = ''
        }
        setDebtInput(debtInput)
    }

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
        // debtInputReset()
        // console.log('debtinput exact', debtInput)
    }

    const onClickPercent = () => {
        setExactPaymentsForm(false);
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(true);
        setCreationMethod("Unequal")
        // debtInputReset()
        // console.log('debtinput percent', debtInput)
    }

    // Hooks for form input
    const [cost, setCost] = useState(0);
    let costLength = cost.length
    const [creationMethod, setCreationMethod] = useState("Equal");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png")
    // const [createdAt, setCreatedAt] = useState("");
    //default should be a string interpolation using methid that gets you current time
    const [participants, setParticipants] = useState([user.id]);
    let participantsLength = participants.length;
    // console.log('participants length at beginning:', participantsLength)
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
        if (splitText === "equally") {
            setEqualPaymentsForm(true);
        }
        // setExactPaymentsForm(false);
        // setPercentPaymentsForm(false);
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
        setDebtInput({ ...debtInput, [participant]: newDebtValue })
        // console.log('name:', participant)
        // console.log('newdebtvalue:', newDebtValue)
    };
    // console.log('later debt input:', debtInput)

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
            sum += parseFloat(debtInput[i])
        }
        // console.log('sum:', sum)
        setDebtSum(sum)
        // console.log('debt input in use effect:', debtInput)
        if (splitText === 'equally') {
            setRepayments(exactPayments(creatorId, participants, debtInput, cost))
            console.log('in if equal repayments:', repayments)
        }
        else if (exactPaymentsForm) {
            setRepayments(exactPayments(creatorId, participants, debtInput, cost))
            // console.log('in if exact repayments:', repayments)
        }
        else {
            setRepayments(percentPayments(creatorId, participants, debtInput, cost))
            // console.log('in if percent repayments:', repayments)
        }
    }, [debtInput])

    // everytime there is a cost or participants input change, calculate equal share
    useEffect(() => {
        if (splitText === "equally") {
            // rounding when needed
            const equalShare = Math.round(((cost / participantsLength) + Number.EPSILON) * 100) / 100;
            for (let i = 0; i < participantsLength; i++) {
                if (i === participantsLength - 1) {
                    let total = 0;
                    for (let j in debtorObj) {
                        total += parseFloat(debtorObj[j]);
                    }
                    debtorObj[participants[i]] = `${cost - total}`
                }
                else {
                    debtorObj[participants[i]] = `${equalShare}`
                }
                setDebtInput({ ...debtorObj })
            }
        }
        else {
            const newDebtInput = {};
            for (let i of participants) {
                if (debtInput[i]) {
                    newDebtInput[i] = debtInput[i]
                }
                else {
                    newDebtInput[i] = ''
                }
            }
            setDebtInput(newDebtInput)
        }
        // console.log('participants length:', participantsLength)
        // setParticipants(participants)
        // console.log('participants in array length change:', participants)
    }, [costLength, participantsLength, equalPaymentsForm])

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
        // console.log('repayments:', repayments)

        const newTransaction = {
            cost,
            creation_method: creationMethod,
            description,
            note,
            image,
            created_at: stringDate,
            payers: `${user.id}/${cost}`,
            repayments
        }
        // console.log('new transaction', newTransaction)

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
        dispatch(getAllTransactions())
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
            // console.log('participants before:', participants)
            const index = participants.indexOf(e.target.value)
            participants.splice(index, 1);
            setParticipants([...participants]);
            // participantsLength = participants.length
            // console.log('participantsLength:', participantsLength)
            // console.log('participants after:', participants)
        } else {
            setParticipants([...participants, e.target.value])
            // console.log('participants:', participants)
        }
    }

    // re render when participant is taken away
    // useEffect(() => {
    //     console.log('participants length inside final use effect:', participantsLength)
    //     setParticipants(participants)
    // }, [participantsLength])



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
                    <form className="add-expense-form-body-wrapper" onSubmit={handleSubmit} >
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
                        <div className="desription-amount-container">
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
                                <div className="currency-code">$</div>
                                <input
                                    className="form-amount"
                                    type="number"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
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
                                <div className="split-body-wrapper">
                                    <div className="equal-repayments">
                                        {participants.map(participant => (
                                            <div className="single-debtor">
                                                <div className="debtor-name">{getParticipantName(participant)}</div>
                                                <div className="debtor-amount">${debtInput[participant]}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="aggregate-repayment">
                                        <div className="total-repayment">TOTAL</div>
                                        <div className="repayment-vs-cost">
                                            <div className="repayment-amount">${debtSum}</div>
                                            <div className="cost-amount">${parseFloat(cost) - debtSum} left</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {exactPaymentsForm && (
                                <div className="split-body-wrapper">
                                    <form className="exact-repayments">
                                        {participants.map(participant => (
                                            <div className="single-debtor">
                                                <div className="debtor-name">{getParticipantName(participant)}</div>
                                                <div className="debt" key={participant}>
                                                    <label> $
                                                        <input
                                                            className="debtor-amount-input"
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
                                        <div className="repayment-vs-cost">
                                            <div className="repayment-amount">${debtSum}</div>
                                            <div className="cost-amount">${parseFloat(cost) - debtSum} left</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {percentPaymentsForm && (
                                <div className="split-body-wrapper">
                                    <form className="percent-repayments">
                                        {participants.map(participant => (
                                            <div className="single-debtor">
                                                <div className="debtor-name">{getParticipantName(participant)}</div>
                                                <div className="debt">
                                                    <label>
                                                        <input
                                                            className="debtor-amount-input"
                                                            type="number"
                                                            value={debtInput[participant] || ''}
                                                            name={participant}
                                                            onChange={handleUserInputChange}
                                                        // placeholder={cost/participants.length}
                                                        />%
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </form>
                                    <div className="aggregate-repayment">
                                        <div className="total-repayment">TOTAL</div>
                                        <div className="repayment-vs-cost">
                                            <div className="repayment-amount">{debtSum}%</div>
                                            <div className="cost-amount">{100.00 - debtSum}% left</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>)}
            </div>
        </>
    );
}
// %{debtSum}
// %{100.00 - debtSum} left
