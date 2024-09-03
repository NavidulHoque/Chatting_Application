/* eslint-disable react/prop-types */
import AddFriendIcon from '../../../icons/AddFriendIcon';
import avatar from "../../../assets/avatar.png"
import { getDatabase, push, ref, remove, set } from 'firebase/database';
import { Bounce, toast } from 'react-toastify';

const SingleUser = ({ user, cancelRequests, loggedInUser, friendRequests }) => {
    const db = getDatabase()
    function handleCancelRequest(user) {

        const cancelRequestID = cancelRequests.find(req => req.receiverID === user.id && req.senderID === loggedInUser.id).friendRequestID

        const deleteRef = ref(db, `friendRequests/${cancelRequestID}`)

        remove(deleteRef)
            .then(() => {
                console.log('Data successfully deleted!');
            })
            .catch(() => {
                toast.error("Something went wrong, please try again", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            });
    }
    function handleSendFriendRequest(receiver) {

        //storing the data in the database
        set(push(ref(db, 'friendRequests/')), {
            senderID: loggedInUser.id,
            senderName: loggedInUser.displayName,
            senderPhoto: loggedInUser.photoURL || avatar,
            receiverID: receiver.id,
            receiverName: receiver.displayName,
            receiverPhoto: receiver.photoURL || avatar
        })
    }
    return (
        friendRequests.includes(loggedInUser.id + user.id) ?
            (
                <div className="flex xl:flex-row lg:flex-col xl:justify-between lg:justify-center justify-between items-center gap-1">

                    <div className="flex gap-x-2 items-center self-start">

                        <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                            <img src={user.photoURL || avatar} alt="profilePic" className="w-full h-full" />

                        </div>

                        <p>{user.displayName}</p>

                    </div>

                    <button
                        onClick={() => handleCancelRequest(user)}
                        className='bg-red-500 text-white rounded-md py-[10px] px-[5px] self-end xl:self-center'
                    >
                        Cancel request
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center">

                    <div className="flex gap-x-2 items-center">

                        <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                            <img src={user.photoURL || avatar} alt="profilePic" className="w-full h-full" />

                        </div>

                        <p>{user.displayName}</p>

                    </div>

                    <div
                        onClick={() => handleSendFriendRequest(user)}
                        className="text-[#292D32] cursor-pointer"
                    >
                        <AddFriendIcon />
                    </div>

                </div>
            )
    )
}

export default SingleUser
