import { child, getDatabase, onValue, ref, update } from "firebase/database"

export default function updateFriendField(loggedInUser, downloadURL) {
    const db = getDatabase()

    //first read operation

    const friendsRef = ref(db, 'friends/')
    onValue(friendsRef, (snapshot) => {

        const friendsArr = []

        snapshot.forEach(friendship => {

            if (friendship.val().friend1ID === loggedInUser.id || friendship.val().friend2ID === loggedInUser.id) {

                friendsArr.push({ ...friendship.val(), friendshipID: friendship.key })
            }
        })

        //then update operation

        let length = friendsArr.length

        for (let i = 0; i < length; i++) {
            const friendship = friendsArr[i]

            if (friendship.friend1ID === loggedInUser.id) {

                const friendRef = child(ref(db), `friends/${friendship.friendshipID}`)

                update(friendRef, { friend1Photo: downloadURL })
            }

            else if (friendship.friend2ID === loggedInUser.id) {

                const friendRef = child(ref(db), `friends/${friendship.friendshipID}`)

                update(friendRef, { friend2Photo: downloadURL })
            }
        }
    })
}