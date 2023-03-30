import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";


function EditSettleUp({transaction}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  return null
}

export default EditSettleUp