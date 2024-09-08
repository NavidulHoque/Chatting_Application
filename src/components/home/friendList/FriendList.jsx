import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeFriends } from "../../../features/slices/friendsSlice";
import sortingFriends from "../../../functions/sortingFriends";
import SingleFriend from "./SingleFriend";

const FriendList = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  
  const friends = useSelector(state => state.friends.friends)
  const loggedInUser = useSelector((state) => state.UserLogin.user)
  const [unfriendInfo, setUnfriendInfo] = useState([])

  //storing friend of the logged in user in the redux while reloading
  useEffect(() => {

    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      const friends = []

      snapshot.forEach((friendship) => {

        if (loggedInUser.id === friendship.val().friend1ID) {
          friends.push({ friendID: friendship.val().friend2ID, friendName: friendship.val().friend2Name, friendPhoto: friendship.val().friend2Photo })
        }

        else if (loggedInUser.id === friendship.val().friend2ID) {
          friends.push({ friendID: friendship.val().friend1ID, friendName: friendship.val().friend1Name, friendPhoto: friendship.val().friend1Photo })
        }
      })

      dispatch(storeFriends(friends))
    })
  }, [db, dispatch, loggedInUser.id])


  useEffect(() => {

    const friendsRef = ref(db, "friends/")
    onValue(friendsRef, (snapshot) => {
      const friends = [];

      snapshot.forEach((friendship) => {

        if (loggedInUser.id === friendship.val().friend1ID) {

          friends.push({ friendID: friendship.val().friend2ID, friendshipID: friendship.key })

        }

        else if (loggedInUser.id === friendship.val().friend2ID) {

          friends.push({ friendID: friendship.val().friend1ID, friendshipID: friendship.key })

        }
      })

      setUnfriendInfo(friends)
    })
  }, [db, loggedInUser.id])


  return (
    <div className="pt-5 flex flex-col gap-y-4">

      {sortingFriends(friends).map((friend) => (
        <SingleFriend key={friend.friendID} friend={friend} unfriendInfo={unfriendInfo} />
      ))}

    </div>
  );


}

export default FriendList
