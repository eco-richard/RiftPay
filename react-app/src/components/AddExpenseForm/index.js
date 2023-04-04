import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadFriendsThunk, loadSingleFriendThunk } from "../../store/friends";
import { exactPayments, percentPayments } from './split_options'
import './AddExpenseForm.css'
import { createTransaction} from "../../store/transaction";
import { useLocation, useHistory } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function AddExpenseForm({friendId}) {
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const friends = Object.values(useSelector(state => state.friends.friends))
    const creator = user;
    const creatorId = creator.id
    const createdAt = new Date();
    const stringDate = createdAt.toISOString().slice(0, 10)
    const [alerted, setAlerted] = useState(false)
    const location = useLocation()
    const history = useHistory();
    const options = [];


    //form render state variables
    const [equalPaymentsForm, setEqualPaymentsForm] = useState()
    const [exactPaymentsForm, setExactPaymentsForm] = useState()
    const [percentPaymentsForm, setPercentPaymentsForm] = useState()

    // const debtInputReset = () => {
    //     for (let i in debtInput) {
    //         debtInput[i] = ''
    //     }
    //     setDebtInput(debtInput)
    // }


    //fucntions to determine which type of payment split form is rendered
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
        setCreationMethod("Unequal");
    }
    const onClickPercent = () => {
        setExactPaymentsForm(false);
        setEqualPaymentsForm(false);
        setPercentPaymentsForm(true);
        setCreationMethod("Unequal");
    }

    // Hooks for form input
    const [cost, setCost] = useState(0);
    let costLength = cost.length
    const [creationMethod, setCreationMethod] = useState("Equal");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png");
    const [participants, setParticipants] = useState([user.id]);
    let participantsLength = participants.length;
    const [repayments, setRepayments] = useState('')
    const [errors, setErrors] = useState([]);

    //state variable for opening image and notes form
    const [imagesOpen, setImagesOpen] = useState(false);

    //state variable for opening additional modal form (two can be open at once)
    const [openSplitModal, setOpenSplitModal] = useState(false);

    //function to open or close payment type modal for transaction
    const paymentTypeModalClick = () => {
        setOpenSplitModal(!openSplitModal);
        if (splitText === "equally") {
            setEqualPaymentsForm(true);
        }
        setImagesOpen(false)
    }

    //function to open or close modal to add images or notes to transaction
    const openImagesNotes = (e) => {
        // e.preventDefault();
        setImagesOpen(!imagesOpen)
        setOpenSplitModal(false)
    }

    //state variable for tracking amount owed by each participant in transaction
    const [debtInput, setDebtInput] = useState({});

    //function for handling changes in the amount owed for a transaction participant
    const handleUserInputChange = (e) => {
        const participant = e.target.name;
        const newDebtValue = e.target.value;
        setDebtInput({ ...debtInput, [participant]: newDebtValue })
    };

    //state variable for tracking sum of all indivdual debts within transaction
    const [debtSum, setDebtSum] = useState('')

    //recalculate sum of all individual debts every time there is a change in debt amount of single participant
    useEffect(() => {
        let sum = 0;
        for (let i in debtInput) {
            if (debtInput[i].length === 0) {
                debtInput[i] = 0
            }
            sum += parseFloat(debtInput[i])
        }
        setDebtSum(sum)
        if (splitText === 'equally') {
            setRepayments(exactPayments(creatorId, participants, debtInput, cost))
        }
        else if (exactPaymentsForm) {
            setRepayments(exactPayments(creatorId, participants, debtInput, cost))
        }
        else {
            setRepayments(percentPayments(creatorId, participants, debtInput, cost))
        }
    }, [debtInput])

    //object keeps track of participants and the amount they owe within the transaction
    let debtorObj = {};

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
    }, [costLength, participantsLength, equalPaymentsForm])


    //submit form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        if (participantsLength == 1) {
            window.confirm("There is only one person involved in this expense. Do you still want to save it?")
        }

        //repayments is what is returned from the repayments algorithms in split_options.js
        if (repayments == "Unequal payments") {
            errors.push(`The total of everyone's owed shares ($${debtSum}) is different from the total cost ($${cost})`)
        }

        if (repayments == "Insufficient percentages") {
            errors.push(`The total of everyone's owed shares ($${debtSum}) does not add up to 100%`)
        }

        if (description.length > 50) {
            errors.push("Description must be less than 50 characters")
        }

        if (note.length > 250) {
            errors.push("Note must be less than 250 characters")
        }

        if (image.length > 250) {
            errors.push("Image URL must be less than 250 characters")
        }

        if (cost > 100000000) {
            errors.push("Cost can not exceed one millions dollars")
        }

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
        if (errors.length > 0) {
            return window.alert(`${errors[0]}`)
        }

        const response = await dispatch(createTransaction(newTransaction))
            .then(closeModal)
            .then(() => {
                if (friendId) {
                    dispatch(loadSingleFriendThunk(friendId))
                }
                else {
                    dispatch(loadFriendsThunk())
                }
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    else if (data && data.title.includes('Error')) setErrors([data.message]);
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
        return `${person.first_name} ${person.last_name}`
    }

    let splitText = exactPaymentsForm || percentPaymentsForm ? "unequally" : "equally";

    //updates transaction participants when user adds them in the form
    const addParticipants = (e) => {
        if (participants.includes(e.target.value)) {
            const index = participants.indexOf(e.target.value)
            participants.splice(index, 1);
            setParticipants([...participants]);
        } else {
            setParticipants([...participants, e.target.value])
        }
    }


    const alertFunc = () => {
        window.alert("You have no one in your friends list yet!");
    }

    for (const friend of friends) {
        options.push({
            value: friend.id,
            label: `${friend.first_name} ${friend.last_name}`
        })
    }

    //can not use add transaction form if user has no friends
    if (friends.length === 0) {
        return (
          <div>
            <div className="no-friends-lol">You have no friends to settle up with!</div>
            <div className="alert-button-container">

              <button className="alert-button" onClick={closeModal}>Ok</button>
            </div>
          </div>
        )
      }

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
                    <form className="add-expense-form-body-wrapper" onSubmit={handleSubmit}>
                        <div className="participants-selection">
                            <label>
                                With you and:
                                <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={options}
                                onChange={(e) => {
                                    const newParticipants = [...participants, e[e.length-1].value];
                                    setParticipants([...newParticipants]);
                                }}/>
                                {/* <select
                                    value={participants}
                                    multiple="true"
                                    onChange={(e) => addParticipants(e)}>
                                    {friends.map(friend => (
                                        <option value={friend.id}>{`${friend.first_name} ${friend.last_name}`}</option>
                                    ))}
                                </select> */}
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
                        <div className='form-image-notes'>
                            <button type="button" onClick={openImagesNotes}>Add images/notes</button>
                        </div>
                        <div className="form-cancel-save-div">
                            <button className="cancel-button" onClick={closeModal}>Cancel</button>
                            <button className="save-button" disabled={!!errors.length} type="submit">Save</button>

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
                {imagesOpen && (
                    <div className='add-image-notes'>
                        <div className='add-image-header'>
                            <div className='form-title'>
                                Add image/notes
                            </div>
                            <div className='form-close-button'>
                                <button onClick={() => setImagesOpen(false)}>X</button>
                            </div>
                        </div>
                        <div className='add-image-body'>
                            <div className='add-image-image'>
                                <label className="add-image-label">Include an image:
                                    <input
                                        className='image-field'
                                        value={image}
                                        type="url"
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <input
                                        className="form-note-field"
                                        value={note}
                                        type="textarea"
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Add notes"
                                    />
                                </label>
                            </div>
                            <div className='add-image-footer'>
                                <div className="done-button-container">
                                    <button className="done-button" onClick={() => setImagesOpen(false)}>Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
