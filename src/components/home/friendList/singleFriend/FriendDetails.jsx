/* eslint-disable react/prop-types */

const FriendDetails = ({ friend }) => {
    return (
        <div className="flex gap-x-2 items-center self-start">

            <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                <img
                    src={friend.friendPhoto}
                    alt="profile pic"
                    className="w-full h-full"
                />

            </div>

            <p>
                {friend.friendName}
            </p>
            
        </div>
    )
}

export default FriendDetails
