/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import SendMessage from './SendMessage';
import AudioMessage from './AudioMessage';

const ChatContainer = ({ activeFriend }) => {
    const db = getDatabase()
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const [messages, setMessages] = useState([])
    const scrollRef = useRef(null)

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
            <div className="h-[87%]">

                <div className="bg-white sm:h-[85%] h-[89%] overflow-y-auto">

                    <div ref={scrollRef} className='flex flex-col gap-5 p-3'>

                        {messages.map(message => {

                            // sender's text message
                            if (message.senderID === loggedInUser.id && message.message) {
                                return (

                                    <TextMessage key={message.messageID} message={message} alignSelf="self-end" messageColor="bg-green-700" />
                                )
                            }

                            // receiver's text message
                            else if (message.receiverID === loggedInUser.id && message.message) {
                                return (

                                    <TextMessage key={message.messageID} message={message} alignSelf="self-start" messageColor="bg-slate-500" />
                                )
                            }

                            // sender's image message
                            else if (message.senderID === loggedInUser.id && message.photoURL) {
                                return (
                                    <ImageMessage key={message.messageID} message={message} alignSelf="self-end" />
                                )
                            }

                            // receiver's image message
                            else if (message.receiverID === loggedInUser.id && message.photoURL) {
                                return (
                                    <ImageMessage key={message.messageID} message={message} alignSelf="self-start" />
                                )
                            }

                            // sender's audio message
                            else if (message.senderID === loggedInUser.id && message.audioMessage) {
                                return (
                                    <AudioMessage key={message.messageID} message={message} alignSelf="self-end" />
                                )
                            }

                            // receiver's audio message
                            else if (message.receiverID === loggedInUser.id && message.audioMessage) {
                                return (
                                    <AudioMessage key={message.messageID} message={message} alignSelf="self-start" />
                                )
                            }
                        })}

                    </div>

                </div>

                <SendMessage loggedInUser={loggedInUser} activeFriend={activeFriend} />

            </div>
        </>
    )
}

export default ChatContainer
