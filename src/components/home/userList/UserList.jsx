/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import sortingUsers from '../../../functions/sortingUsers';
import SingleUser from './SingleUser';

const UserList = ({ friendRequests, setCancelRequests, cancelRequests }) => {
    const [users, setUsers] = useState([])
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const db = getDatabase()
    const friends = useSelector(state => state.friends.friends)

    //show other users
    useEffect(() => {

        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            const users = []

            snapshot.forEach((userList) => {

                if (userList.key !== loggedInUser.id) {

                    //at receiver side, the condition is not allowing to render the sender in the userLists, also if they are friends
                    if (!friendRequests.includes(userList.key + loggedInUser.id) && !friends.find(friend => friend.friendID === userList.key)) {
                        users.push({
                            ...userList.val(),
                            id: userList.key,
                        })
                    }
                }
            })

            setUsers([...users])
        })

    }, [db, loggedInUser.id, friendRequests, friends])

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

    
    return (
        <div className="pt-5 flex flex-col gap-y-3">

            {sortingUsers(users).map((user) => (
                <SingleUser key={user.id} user={user} cancelRequests={cancelRequests} loggedInUser={loggedInUser} friendRequests={friendRequests} />
            ))}

        </div>
    )
}

export default UserList
