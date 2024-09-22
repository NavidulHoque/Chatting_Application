/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeFriendActive } from "../../../../features/slices/singleActiveFriendSlice";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { Bounce, toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { storeBlockees } from "../../../../features/slices/blockeesSlice";
import { storeBlockers } from "../../../../features/slices/blockersSlice";
import Button from "../../common/Button";
import FriendDetails from "./FriendDetails"
import ButtonContainer from "../../common/ButtonContainer"
import SingleUserContainer from "../../common/SingleUserContainer"

const SingleFriend = ({ friend, unfriendInfo, loggedInUser }) => {
    const location = useLocation()
    const activeFriend = useSelector(state => state.activeFriend.activeFriend)
    const dispatch = useDispatch()
    const db = getDatabase()
    const blockees = useSelector(state => state.blockees.blockees)
    const blockers = useSelector(state => state.blockers.blockers)

    const isTheFriendBlockee = useMemo(() => {

        return blockees.some(blockee => blockee?.blockeeID === friend?.friendID)

    }, [blockees, friend])

    const isTheFriendBlocker = useMemo(() => {

        return blockers.some(blocker => blocker?.blockerID === friend?.friendID)

    }, [blockers, friend])


    //fetching blockees of logged in user
    useEffect(() => {

        const blocksRef = ref(db, "blocks/")
        onValue(blocksRef, (snapshot) => {
            const blockInfos = []

            snapshot.forEach((blockInfo) => {
                if (blockInfo.val().blockerID === loggedInUser.id) {
                    blockInfos.push({ blockeeID: blockInfo.val().blockeeID, blockeeName: blockInfo.val().blockeeName, blockID: blockInfo.key })
                }

            })

            dispatch(storeBlockees(blockInfos))
        })

    }, [db, loggedInUser, dispatch])


    //fetching blockers of logged in user
    useEffect(() => {

        const blocksRef = ref(db, "blocks/")
        onValue(blocksRef, (snapshot) => {
            const blockInfos = []

            snapshot.forEach((blockInfo) => {
                if (blockInfo.val().blockeeID === loggedInUser.id) {
                    blockInfos.push({ blockerID: blockInfo.val().blockerID, blockerName: blockInfo.val().blockerName })
                }

            })

            dispatch(storeBlockers(blockInfos))
        })

    }, [db, loggedInUser, dispatch])


    const handleUnfriend = (friend) => {

        const unfriendID = unfriendInfo.find((info) => info.friendID === friend.friendID).friendshipID

        const deleteRef = ref(db, `friends/${unfriendID}`)

        remove(deleteRef)
            .then(() => {
                console.log("Data successfully deleted!")
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
                })
            })
    }

    const handleBlock = (friend) => {

        //storing the data in the database
        set(push(ref(db, 'blocks/')), {
            blockerID: loggedInUser.id,
            blockerName: loggedInUser.displayName,
            blockeeID: friend.friendID,
            blockeeName: friend.friendName,
        })

    }

    const handleUnblock = (friend) => {

        const blockID = blockees.find(blockee => blockee.blockeeID === friend.friendID).blockID

        const deleteRef = ref(db, `blocks/${blockID}`)

        remove(deleteRef)
            .then(() => {
                console.log("Data successfully deleted!")
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
                })
            })
    }

    if (location.pathname === "/") {
        return (
            <SingleUserContainer>

                <FriendDetails friend={friend} extraStyle="self-start" />

                <ButtonContainer>

                    <Button label="Unfriend" handleClick={handleUnfriend} user={friend} bgColor="bg-[#4A81D3]" />

                    {isTheFriendBlockee ? (

                        <Button label="Unblock" handleClick={handleUnblock} user={friend} bgColor="bg-[#D34A4A]" />

                    )
                        : isTheFriendBlocker ? "" : (

                            <Button label="Block" handleClick={handleBlock} user={friend} bgColor="bg-[#D34A4A]" />
                        )}

                </ButtonContainer>

            </SingleUserContainer>
        )
    }

    else if (location.pathname === "/messages") {
        return (
            <>
                <SingleUserContainer

                    extraStyle={activeFriend?.friendID === friend.friendID ?
                        "bg-green-500 text-black p-[20px] cursor-pointer"
                        : "bg-white hover:bg-slate-100 p-[20px] cursor-pointer"}

                    onClick={() => dispatch(makeFriendActive(friend))}
                >
                    <FriendDetails friend={friend} extraStyle="self-start" />

                    <ButtonContainer>

                        <Button label="Unfriend" handleClick={handleUnfriend} user={friend} bgColor="bg-[#4A81D3]" />

                        {isTheFriendBlockee ? (

                            <Button label="Unblock" handleClick={handleUnblock} user={friend} bgColor="bg-[#D34A4A]" />

                        )
                            : isTheFriendBlocker ? "" : (

                                <Button label="Block" handleClick={handleBlock} user={friend} bgColor="bg-[#D34A4A]" />
                            )}

                    </ButtonContainer>

                </SingleUserContainer>

            </>
        )
    }

}

export default SingleFriend
