import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { loadFriendsThunk, loadSingleFriendThunk } from '../../store/friends';
import { createTransaction} from '../../store/transaction';
import { MONTHS } from '../AllExpenses/TransactionDetails';
import './SettleUpForm.css'

export default function SettleUpForm({singleFriend, friendId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const friends = Object.values(useSelector(state => state.friends.friends));

  let initialFriend;
  if (!singleFriend) {
    initialFriend = friends[0]
  }
  else {
    initialFriend = singleFriend
  }

  const [friend, setFriend] = useState(initialFriend);
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [imagesOpen, setImagesOpen] = useState(false);

  const ARROW_URL = "https://assets.splitwise.com/assets/fat_rabbit/settle-up-arrow-83553d33b6848bbdfa3499d7e217748aab1f75ff2073ec5ac67cba5246e12459.png";
  const DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal1-100px.png"
  const userImage = user.picture === null ? DEFAULT_IMAGE_URL : user.picture;


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    let date = new Date();
    date = date.toISOString().slice(0, 10);
    const payers = `${user.id}/${amount}`;
    const repayments = `${friend.id}/${user.id}/0,${user.id}/${friend.id}/${amount}`;
    if (image === null) {
      image = "https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
    }


    if (note.length > 250) {
      errors.push("Note must be less than 250 characters")
    }

    if (image.length > 250) {
      errors.push("Image URL must be less than 250 characters")
    }

    if (amount > 100000000) {
      errors.push("Cost can not exceed one millions dollars")
    }

    if (amount <= 0) {
      errors.push("Must use a positive number to settle up")
    }

    if (friend.balance >= 0) {
      errors.push("Can not settle up with someone in debt to you")
    }

    if (amount > Math.abs(parseInt(friend.balance))) {
      errors.push("Can not settle more than you owe")
    }


    let transaction = {
      cost: amount,
      creation_method: "Payment",
      description: "Payment",
      note,
      image,
      created_at: date,
      payers,
      repayments
    };

    if (errors.length > 0) {
      return window.alert(`${errors[0]}`)
    }

    dispatch(createTransaction(transaction))
      .then(closeModal)
      .catch(
          async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
              else if (data && data.title.includes('Error')) setErrors([data.message]);
          }
      );
    //add in as .then?
    if (friendId) {
        dispatch(loadSingleFriendThunk(friendId))
    }
    else {
        dispatch(loadFriendsThunk())
    }
  }


  const openFriends = (e) => {
    // e.preventDefault();
    setFriendsOpen(!friendsOpen)
    setImagesOpen(false);
  }

  const openImagesNotes = (e) => {
    // e.preventDefault();
    setImagesOpen(!imagesOpen)
    setFriendsOpen(false);
  }
  
  const formatDate = () => {
    const date = new Date();
    let dateStr = date.toISOString();
    dateStr = dateStr.slice(0, 10);
    const year = Number(dateStr.slice(0, 4));
    const day = Number(dateStr.slice(8, 10));
    const month = MONTHS[Number(dateStr.slice(5, 7))]
    return `${month} ${day}, ${year}`
  }

  return (
    <div className='settle-up-forms-container'>
      <div className='settle-up-form-wrapper'>
        <div className='settle-up-form-header'>
          <div className='settle-up-title'>
            Settle up
          </div>
          <div className='settle-up-close-button'>
            <button onClick={closeModal}>X</button>
          </div>
        </div>
        <div className='settle-up-form-body'>
          <div className='settle-up-form-images'>
            <div className='settle-up-form-user-image-div'>
              <img className='settle-up-form-user-image'
                src={userImage}
                alt="" />
            </div>
            <div className='settle-up-form-arrow-div'>
              <img className='settle-up-form-arrow' src={ARROW_URL} alt="" />
            </div>
            <div className='settle-up-form-friend-image-div'>
              <img className='settle-up-form-friend-image'
                src={friend.image === null ? DEFAULT_IMAGE_URL : friend.image}
                alt="" />
            </div>
          </div>
          <div className='settle-up-you-paid'>
            You paid <button onClick={openFriends}>{`${friend.first_name} ${friend.last_name[0]}.`}</button>
          </div>
          <div className='settle-up-amount'>
            <label>
              $
              <input
                className="settle-up-amount-field"
                type="number"
                value={amount}
                required
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00">
              </input>
            </label>
          </div>
          <div className='settle-up-date-notes-div'>
            <div className='settle-up-date'>
              {formatDate()}
            </div>
            <div className='settle-up-image-notes'>
              <button onClick={openImagesNotes}>Add images/notes</button>
            </div>
          </div>
        </div>
        <div className='settle-up-form-footer'>
          <button className='settle-up-cancel'
            onClick={closeModal}>
            Cancel
          </button>
          <button className='settle-up-save'
            onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      {friendsOpen && (
        <div className='choose-recipient-wrapper'>
          <div className='add-image-header'>
            <div className='settle-up-title'>
              Choose a recipient
            </div>
            <div className='settle-up-close-button'>
              <button onClick={() => setFriendsOpen(false)}>X</button>
            </div>
          </div>
          <div className="choose-recipient-body">
            {friends.map(friend => (
              <div className='recipient-wrapper'
                onClick={() => setFriend(friend)}>
                <div className="recipient-image">
                  <img src={friend.image === null ? DEFAULT_IMAGE_URL : friend.image}
                    alt="" />
                </div>
                <div className='recipient-name'>
                  {`${friend.first_name} ${friend.last_name}`}
                </div>
              </div>
            )
            )}
          </div>
          <div className="choose-recipient-footer">
          </div>
        </div>
      )}
      {imagesOpen && (
        <div className='add-image-notes'>
          <div className='add-image-header'>
            <div className='settle-up-title'>
              Add image/notes
            </div>
            <div className='settle-up-close-button'>
              <button onClick={() => setImagesOpen(false)}>X</button>
            </div>
          </div>
          <div className='add-image-body'>
            <div className='add-image-image'>
              <label>Include an image:
                <input
                  className='image-field'
                  value={image}
                  type="url"
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
              <label>
                <input
                  className="settle-up-note-field"
                  value={note}
                  type="textarea"
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add notes"
                />
              </label>
            </div>
            <div className='add-image-footer'>
              <button className="done-button" onClick={() => setImagesOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
