/* eslint-disable react/prop-types */
import AddFriendIcon from '../../../icons/AddFriendIcon';
import { getDatabase, push, ref, remove, set } from 'firebase/database';
import { Bounce, toast } from 'react-toastify';
import UserDetails from '../common/UserDetails';

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
            senderPhoto: loggedInUser.photoURL,
            receiverID: receiver.id,
            receiverName: receiver.displayName,
            receiverPhoto: receiver.photoURL
        })
    }
    return (
        friendRequests.includes(loggedInUser.id + user.id) ?
            (
                <div className="flex min-[1770px]:flex-row xl:flex-col min-[1770px]:justify-between xl:justify-center justify-between items-center gap-x-1 gap-y-3">

                    <UserDetails user={user} />

                    <button
                        onClick={() => handleCancelRequest(user)}
                        className='bg-red-500 text-white rounded-md py-[10px] px-[5px] xl:self-end min-[1770px]:self-center'
                    >
                        Cancel request
                    </button>

                </div>

            ) : (
                <div className="flex justify-between items-center">

                    <UserDetails user={user} />

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
