/* eslint-disable react/prop-types */

const FriendDetails = ({ friend }) => {
    return (
        <div className="flex gap-x-2 items-center self-start">

            <div className="rounded-full w-[82px] h-[82px] overflow-hidden">

                <img
                    src={friend.friendPhoto}
                    alt="profile pic"
                    className="w-full h-full"
                />

            </div>

            <p className="text-[23px]">
                {friend.friendName}
            </p>
            
        </div>
    )
}

export default FriendDetails
