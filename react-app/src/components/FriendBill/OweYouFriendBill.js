import './FriendBill.css'

function capitalize(str) {
  return `${str[0].toUpperCase()}${str.substr(1)}`;
}
export default function OweYouFriendBill({friend}) {
  const DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal1-100px.png"

  const firstName = capitalize(friend.first_name)
  const lastName = capitalize(friend.last_name)
  return (
    <div className="individual-friend-bill-div">
      <div className="individual-friend-bill-image-div">
        <img className="individual-friend-bill-image"
          src={friend.image === null ? DEFAULT_IMAGE_URL : friend.image}
          alt=""
        />
      </div>
      <div className="individual-friend-bill-info-div">
        <div className="individual-friend-bill-name">
          {`${firstName} ${lastName}`} 
        </div>
        <div className="individual-friend-bill-owed"
        style={{color: "rgb(91, 197, 167)"}}>
          owes you ${friend.balance.toFixed(2)}
        </div>
      </div>
    </div>
  )
}