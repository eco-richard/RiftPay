import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exactPayments, percentPayments } from "../AddExpenseForm/split_options";
import { useModal } from "../../context/Modal";
import { loadFriendsThunk } from "../../store/friends";
import { createTransaction } from "../../store/transaction";


const EditExpenseForm = ({transaction}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const friends = Object.values(useSelector(state => state.friends.friends))
    let creator;
    const createdAt = new Date();
    const stringDate = createdAt.toISOString().slice(0,10)

    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])

    // different forms for different methods of splitting expense
    const [equalPaymentsForm, setEqualPaymentsForm] = useState()
    const [exactPaymentsForm, setExactPaymentsForm] = useState()
    const [percentPaymentsForm, setPercentPaymentsForm] = useState()

    const onClickEqual = () => {
        setExactPaymentsForm(false);
        setPercentPaymentsForm(false);
        setEqualPaymentsForm(true);
        setCreationMethod("Equal");
    }

    const onClickExact = () => {
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(false);
        setExactPaymentsForm(true);
        setCreationMethod("Unequal")
    }

    const onClickPercent = () => {
        setExactPaymentsForm(false);
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(true);
        setCreationMethod("Unequal")
    }

    const [cost, setCost] = useState(transaction.cost);
    let costLength = cost.length
    const [creationMethod, setCreationMethod] = useState(transaction.creationMethod);
    const [description, setDescription] = useState(transaction.description);
    const [note, setNote] = useState(transaction.note);
    const [image, setImage] = useState(transaction.image)
    const [users, setUsers] = useState(transaction.users)
    const [payers, setPayers] = useState(transaction.payers)
    const [repayments, setRepayments] = useState(transaction.repayments)
    console.log('transaction repayments:', repayments)
    const [errors, setErrors] = useState([]);
    const [openSplitModal, setOpenSplitModal] = useState(false);
    let pariticpantsArr = [];
    const [participants, setParticipants] = useState(pariticpantsArr);
    let participantsLength = participants.length;

    //so the correct for shows up on initial click of update expense
    useEffect(() => {
        if (creationMethod === 'equally') {
            setEqualPaymentsForm(true)
        }
        else {
            setExactPaymentsForm(true)
        }
    }, [dispatch])

    // open split type form
    const paymentTypeModalClick = () => {
        setOpenSplitModal(!openSplitModal);
        // conditional only necessary for create an expense
        // if (splitText === "equally") {
        //     setEqualPaymentsForm(true);
        // }
    }

    // useeffect to change data structure of repayments so its usable on initial form render
    let debtorObj = {};
    useEffect(() => {
        for (let i in repayments) {
            console.log('repayments:', repayments)
            console.log('repayments at index:', repayments[i])
            let singleRepayment = repayments[i];
            console.log('single repayment:', singleRepayment)
            let repaymentDebtor = singleRepayment.debtor;
            pariticpantsArr.push(repaymentDebtor.id)
            // fill participants state variable
            console.log('participants inside for loop:', participants)
            debtorObj[repaymentDebtor.id] = singleRepayment.amount
            console.log('debtor object:', debtorObj)
        }
        setParticipants(pariticpantsArr);
        setDebtInput(debtorObj);
        console.log('debtInput outside loop:', repayments)
        console.log('participants:', participants)
    }, [dispatch])

    // payment splits state variable
    const [debtInput, setDebtInput] = useState(debtorObj);

    // function to update payment splits
    const handleUserInputChange = (e) => {
        const participant = e.target.name;
        const newDebtValue = e.target.value;
        setDebtInput({...debtInput, [participant]: newDebtValue})
    };

    // state variable to help user knows if repayments add up to total cost
    const [debtSum, setDebtSum] = useState('')

    // multi purpose useEffect listening for changes in payment splits
    useEffect(() => {
        // calculating debt sum so user knows if repayments add up to total cost
        let sum = 0;
        for (let i in debtInput) {
            if (debtInput[i].length === 0) {
                debtInput[i] = 0
            }
            sum += parseInt(debtInput[i])
        }
        setDebtSum(sum)

        // refactor repayments so they can populate database without error depeding on split type
        if (splitText === 'equally') {
            setRepayments(exactPayments(creator, participants, debtInput, cost))
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
    }, [costLength, participantsLength, equalPaymentsForm])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newTransaction = {
            ...transaction,
            cost,
            creation_method:creationMethod,
            description,
            note,
            image,
            updated_at:stringDate,
            payers,
            repayments
        }

        const response = await dispatch(createTransaction(newTransaction))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );

    }

    // function that allows names of those involved in transaction to be rendered in payment splits form
    const getParticipantName = (participant) => {
        let id = parseInt(participant);
        console.log('id:', id)
        let person;
        console.log(user.id)
        if (id === user.id) {
            person = user
            console.log('person:', person)
            return `${person.first_name} ${person.last_name}`
        }
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id === id) {
                person = friends[i]
            }
        }
        return `${person.first_name} ${person.last_name}`
    }

    // if statemment to determing what button that renders split payments form displayes
    let splitText = exactPaymentsForm || percentPaymentsForm ? "unequally" : "equally";


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
                                %{100 - debtSum} left
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

export default EditExpenseForm;
