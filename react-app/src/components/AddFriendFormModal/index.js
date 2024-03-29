import React, { useState } from "react";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addFriendThunk } from "../../store/friends";
import "./AddFriendForm.css";

function AddFriendFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(addFriendThunk(email))
    if (data) {
      let errorsArr = []
      data.forEach(error => {
        errorsArr.push(error.split(" : ")[1])
      });
      setErrors(errorsArr);
    } else {
      closeModal()
      history.push("/dashboard")
    }
  };


  return (
    <>
      <div className="add-friend-form-container">
        <h1 className="add-friend-header">Add Friend</h1>
        <form onSubmit={handleSubmit}>
          <div className="errors-container" style={{color: "red"}}>
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
          <input
            className="add-friend-input"
            placeholder="Email Address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="add-friend-button-container">
            <button className="add-friend-button" type="submit">Add Friend</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddFriendFormModal;
