/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useMemo, useRef, useState } from 'react';
import Blocked from '../../home/friendList/Blocked';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import SendMessage from './SendMessage';

const ChatContainer = ({ activeFriend }) => {
    const db = getDatabase()
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const [messages, setMessages] = useState([])
    const scrollRef = useRef(null)
    const blockees = useSelector(state => state.blockees.blockees)
    const blockers = useSelector(state => state.blockers.blockers)

    const isBlockeeAvailable = useMemo(() => {

       return blockees.some(blockee => blockee?.blockeeID === activeFriend?.friendID)
       
    }, [activeFriend, blockees])

    const isBlockerAvailable = useMemo(() => {

        return blockers.some(blocker => blocker?.blockerID === activeFriend?.friendID)
        
     }, [activeFriend, blockers])


    //fetching messages from db
    useEffect(() => {
        const messagesRef = ref(db, 'messages/')
        onValue(messagesRef, (snapshot) => {

            const messages = []

            snapshot.forEach(message => {

                if ((message.val().senderID === loggedInUser.id && message.val().receiverID === activeFriend?.friendID) || (message.val().receiverID === loggedInUser.id && message.val().senderID === activeFriend?.friendID)) {

                    messages.push({ ...message.val(), messageID: message.key })
                }
            })

            setMessages(messages)
        })

    }, [db, loggedInUser, activeFriend])

    //for scrolling down to latest messages
    useEffect(() => {

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }

    }, [messages])

    return (
        <>
            <div className="h-[960px]">

                <div className="bg-[#FBFBFB] h-[760px] overflow-y-auto">

                    <div ref={scrollRef} className='flex flex-col gap-5 p-3'>

                        {messages.map(message => {

                            if (message.senderID === loggedInUser.id && message.message) {
                                return (

                                    <TextMessage key={message.messageID} message={message} alignSelf="self-end" messageColor="bg-green-700" />
                                )
                            }

                            else if (message.receiverID === loggedInUser.id && message.message) {
                                return (

                                    <TextMessage key={message.messageID} message={message} alignSelf="self-start" messageColor="bg-slate-500" />
                                )
                            }

                            else if (message.senderID === loggedInUser.id && message.photoURL) {
                                return (
                                    <ImageMessage key={message.messageID} message={message} alignSelf="self-end" />
                                )
                            }

                            else if (message.receiverID === loggedInUser.id && message.photoURL) {
                                return (
                                    <ImageMessage key={message.messageID} message={message} alignSelf="self-start" />
                                )
                            }
                        })}

                    </div>

                </div>

                <SendMessage loggedInUser={loggedInUser} activeFriend={activeFriend} />

            </div >

            { (isBlockerAvailable
            || isBlockeeAvailable)
            && <Blocked isBlockerAvailable={isBlockerAvailable} isBlockeeAvailable={isBlockeeAvailable} blockees={blockees} blockers={blockers} activeFriend={activeFriend} />}
        </>
    )
}

export default ChatContainer
