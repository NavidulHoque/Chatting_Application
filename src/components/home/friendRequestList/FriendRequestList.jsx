/* eslint-disable react/prop-types */
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sortingUsers from "../../../functions/sortingUsers";
import SingleSender from "./SingleSender";
import { Bounce, toast } from "react-toastify";

const FriendRequestList = ({ friendRequests, cancelRequests }) => {
    const db = getDatabase()
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const [senders, setSenders] = useState([])

    useEffect(() => {
        const usersRef = ref(db, 'users/');

        onValue(usersRef, (snapshot) => {
            const senders = []

            snapshot.forEach((userList) => {

                if (userList.key !== loggedInUser.id) {

                    // At receiver side, the senders are being stored
                    if (friendRequests.includes(userList.key + loggedInUser.id)) {
                        senders.push({
                            ...userList.val(),
                            id: userList.key,
                        })
                    }
                }
            })

            setSenders([...senders])
        });

    }, [db, loggedInUser.id, friendRequests])
    

    const handleRejection = (sender) => {
        const cancelRequestID = cancelRequests.find(req => req.receiverID === loggedInUser.id && req.senderID === sender.id).friendRequestID

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


    const handleAcceptance = (sender) => {

        const friendship = {
            friend1Name: sender.displayName,
            friend1Photo: sender.photoURL,
            friend1ID: sender.id,
            friend2Name: loggedInUser.displayName,
            friend2Photo: loggedInUser.photoURL,
            friend2ID: loggedInUser.id
        }

        setSenders(senders.filter(sen => sen.id !== sender.id))

        //storing friendship data in firebase
        set(push(ref(db, 'friends/')), friendship)

        //deleting the friend request in firebase
        const cancelRequestID = cancelRequests.find(req => req.receiverID === loggedInUser.id && req.senderID === sender.id).friendRequestID

        const deleteRef = ref(db, `friendRequests/${cancelRequestID}`)

        remove(deleteRef)
            .then(() => {
                console.log('Data successfully deleted!');
            })
    }
    
    return (
        <div className="pt-5 flex flex-col gap-y-3">

            {
                sortingUsers(senders).map(sender => (
                    <SingleSender key={sender.id} sender={sender} handleAcceptance={handleAcceptance} handleRejection={handleRejection} />
                ))
            }

        </div>
    )
}

export default FriendRequestList
