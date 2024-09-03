/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import AddFriendIcon from './../../icons/AddFriendIcon';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import avatar from "../../assets/avatar.png"
import { Bounce, toast } from 'react-toastify';
import sortingUsers from '../../functions/sortingUsers';

const UserLists = ({ friendRequests, setCancelRequests, cancelRequests }) => {
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.UserLogin.user)
    const db = getDatabase()
    const friends = useSelector(state => state.friends.friends)

    //show other users
    useEffect(() => {

        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            const users = []

            snapshot.forEach((userList) => {

                if (userList.key !== user.id) {

                    //at receiver side, the condition is not allowing to render the sender in the userLists, also if they are friends
                    if (!friendRequests.includes(userList.key + user.id) && !friends.find(friend => friend.friendID === userList.key)) {
                        users.push({
                            ...userList.val(),
                            id: userList.key,
                        })
                    }
                }
            })

            setUsers([...users])
        })

    }, [db, user.id, friendRequests, friends])

    //cancel friend requests(at the sender side)
    useEffect(() => {

        const friendRequestsRef = ref(db, 'friendRequests/')
        onValue(friendRequestsRef, (snapshot) => {

            const reqArr = []

            snapshot.forEach(friendRequest => {
                reqArr.push({ ...friendRequest.val(), friendRequestID: friendRequest.key })
            })

            setCancelRequests(reqArr)
        })

    }, [db])

    function handleSendFriendRequest(receiver) {

        //storing the data in the database
        set(push(ref(db, 'friendRequests/')), {
            senderID: user.id,
            senderName: user.displayName,
            senderPhoto: user.photoURL || avatar,
            receiverID: receiver.id,
            receiverName: receiver.displayName,
            receiverPhoto: receiver.photoURL || avatar
        })
    }

    function handleCancelRequest(otherUser) {

        const cancelRequestID = cancelRequests.find(req => req.receiverID === otherUser.id && req.senderID === user.id).friendRequestID

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

    return (
        <div className="pt-5 flex flex-col gap-y-3">

            {sortingUsers(users).map((otherUser) => (
                <div key={otherUser.id} className="flex justify-between items-center">

                    <div className="flex gap-x-2 items-center">

                        <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                            <img src={otherUser.photoURL || avatar} alt="profilePic" className="w-full h-full" />

                        </div>

                        <p>{otherUser.displayName}</p>

                    </div>

                    {
                        friendRequests.includes(user.id + otherUser.id) ?
                            (
                                <button
                                    onClick={() => handleCancelRequest(otherUser)}
                                    className='bg-red-500 text-white rounded-md py-[10px] px-[5px]'
                                >
                                    Cancel request
                                </button>
                            ) : (
                                <div
                                    onClick={() => handleSendFriendRequest(otherUser)}
                                    className="text-[#292D32] cursor-pointer"
                                >
                                    <AddFriendIcon />
                                </div>
                            )
                    }

                </div>
            ))}

        </div>
    )
}

export default UserLists
