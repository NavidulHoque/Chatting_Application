/* eslint-disable react/prop-types */
import EmojiIcon from './../../icons/EmojiIcon';
import GalleryIcon from './../../icons/GalleryIcon';
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import MessagePicture from './MessagePicture';
import { formatDistanceToNow } from 'date-fns';
import { Bounce, toast } from 'react-toastify';

const Chat = ({activeFriend}) => {
    const db = getDatabase()
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const [sendMessage, setSendMessage] = useState("")
    const [messages, setMessages] = useState([])

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

    }, [db, loggedInUser.id, activeFriend?.friendID])


    function handleSendMessage() {

        if (sendMessage !== "") {
            //storing the data in the database
            set(push(ref(db, 'messages/')), {
                senderID: loggedInUser.id,
                receiverID: activeFriend?.friendID,
                message: sendMessage,
                photoURL: "",
                date: new Date().toString()
            })

            setSendMessage("")
        }

        else {
            toast.error("Please write some message", {
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
        }
    }

    return (
        <div className="h-[511px]">

            <div className="bg-[#FBFBFB] h-[431px] overflow-y-auto">

                <div className='flex flex-col gap-5 p-3'>

                    {messages.map(message => {

                        if (message.senderID === loggedInUser.id && message.message) {
                            return (
                                <div key={message.messageID} className='self-end flex flex-col'>

                                    <p className='self-end inline-block bg-green-700 text-white px-3 py-[8px] rounded-lg'>{message.message}</p>

                                    <span className='self-end text-[14px] text-slate-500'>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

                                </div>
                            )
                        }

                        else if (message.receiverID === loggedInUser.id && message.message) {
                            return (
                                <div key={message.messageID} className='self-start flex flex-col'>

                                    <p className='self-start inline-block bg-slate-500 text-white px-3 py-[8px] rounded-lg'>{message.message}</p>

                                    <span className='self-start text-[14px] text-slate-500'>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

                                </div>
                            )
                        }

                        else if (message.senderID === loggedInUser.id && message.photoURL) {
                            return (
                                <div key={message.messageID} className='self-end flex flex-col'>

                                    <div className='self-end w-[300px] h-[190px]'>

                                        <MessagePicture picture={message.photoURL} />

                                    </div>

                                    <span className='self-end text-[14px] text-slate-500'>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

                                </div>

                            )
                        }

                        else if (message.receiverID === loggedInUser.id && message.photoURL) {
                            return (
                                <div key={message.messageID} className='self-start flex flex-col'>

                                    <div className='self-start w-[300px] h-[190px]'>

                                        <MessagePicture picture={message.photoURL} />

                                    </div>

                                    <span className='self-start text-[14px] text-slate-500'>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

                                </div>

                            )
                        }
                    })}

                </div>

            </div>

            <div className="bg-[#F5F5F5] h-[80px] rounded-b-md flex items-center justify-center">

                <div className="bg-white w-[500px] p-[10px] py-[9px] flex items-center justify-between gap-x-3 rounded-md">

                    <div className="flex gap-x-3">

                        <div className="#292D32 cursor-pointer">
                            <EmojiIcon />
                        </div>

                        <div className="#292D32 cursor-pointer">
                            <GalleryIcon />
                        </div>

                    </div>

                    <input
                        type="text"
                        className='outline-none pb-[3px] w-[60%]'
                        placeholder='type something'
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" ? handleSendMessage() : ""}
                    />

                    <button onClick={handleSendMessage} className='bg-[#4A81D3] text-white rounded-md w-[98px] h-[37px]'>Send</button>

                </div>

            </div>

        </div >
    )
}

export default Chat
