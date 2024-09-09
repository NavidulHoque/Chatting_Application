import { child, getDatabase, onValue, ref, update } from "firebase/database"

export default function updateFriendRequestField(loggedInUser, downloadURL) {
    const db = getDatabase()

    //first read operation

    const friendRequestsRef = ref(db, 'friendRequests/')
    onValue(friendRequestsRef, (snapshot) => {

        const reqArr = []

        snapshot.forEach(friendRequest => {

            if (friendRequest.val().senderID === loggedInUser.id || friendRequest.val().receiverID === loggedInUser.id) {

                reqArr.push({ ...friendRequest.val(), friendRequestID: friendRequest.key })
            }
        })

        //then update operation

        let length = reqArr.length

        for (let i = 0; i < length; i++) {
            const friendRequest = reqArr[i]

            if (friendRequest.senderID === loggedInUser.id) {

                const friendRequestRef = child(ref(db), `friendRequests/${friendRequest.friendRequestID}`)

                update(friendRequestRef, { senderPhoto: downloadURL })
            }

            else if (friendRequest.receiverID === loggedInUser.id) {
                const friendRequestRef = child(ref(db), `friendRequests/${friendRequest.friendRequestID}`)

                update(friendRequestRef, { receiverPhoto: downloadURL })
            }
        }
    })
}