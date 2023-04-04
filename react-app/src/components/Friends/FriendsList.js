import { NavLink, Redirect } from 'react-router-dom';
import { useSelector} from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import AddFriendFormModal from "../AddFriendFormModal";
import "./FriendsList.css"

function FriendsList({friends}) {
    const current_user = useSelector(state => state.session.user)
    const friendsArr = Object.values(friends)


    if (Object.keys(friends).length === 0) {
        <div className="friends-list-and-header-container">
        <div className="friends-header-container">
            <div className='friends-label'>FRIENDS</div>
            <>
                <OpenModalButton
                    buttonText="Add"
                    modalComponent={<AddFriendFormModal />}
                />
            </>
        </div>
    </div>
    }

    if (!current_user) return <Redirect to="/"/>

    return (
        <div className="friends-list-and-header-container">
            <div className="friends-header-container">
                <div className='friends-label'>FRIENDS</div>
                <>
                    <OpenModalButton
                        buttonText="Add"
                        modalComponent={<AddFriendFormModal />}
                    />
                </>
            </div>
            <div className='friends-list-container'>
                {friendsArr.map(friend => (
                    <div className="left-nav-link-container">
                        <NavLink to={`/friends/${friend.id}`} className="left-navbar-link" activeClassName="left-navbar-link-active">{`${friend.first_name} ${friend.last_name}`}</NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FriendsList;
