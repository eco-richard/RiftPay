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
    await dispatch(addFriendThunk(email))
    // if (data) {
    //   setErrors(data);
    // } else {
    //     closeModal()
    // }
    closeModal()
    history.push("/dashboard")
  };


  return (
    <>
      <h1>Add Friend</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Friend</button>
      </form>
    </>
  );
}

export default AddFriendFormModal;
