/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import EmojiIcon from './../../icons/EmojiIcon'
import GalleryIcon from './../../icons/GalleryIcon'
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import MessagePicture from './MessagePicture';
import { formatDistanceToNow } from 'date-fns';
import { Bounce, toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';
import { getStorage, ref as Ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Chat = ({ activeFriend }) => {
    const db = getDatabase()
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const [sendMessage, setSendMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const scrollRef = useRef(null)
    const fileRef = useRef(null)
    const imageExtensions = ["jpg", "png", "jpeg", "tif", "webp", "avif"]
    const storage = getStorage()

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

    }, [db, loggedInUser.id, activeFriend?.friendID])

    //for scrolling down to latest messages
    useEffect(() => {

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }

    }, [messages])

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
            setShowEmoji(false)
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

    function handleAddEmoji({ emoji }) {
        setSendMessage(prev => prev + emoji)
    }

    function handleImageFile(e) {
        const imageFile = e.target.files[0]
        const imageFileExtension = imageFile.name.split(".")[1]

        if (imageExtensions.includes(imageFileExtension) && imageFile.size < 1000000) {
            
            const storageRef = Ref(storage, `${loggedInUser.displayName} = messageImages/${imageFile}`);

            const uploadTask = uploadBytesResumable(storageRef, imageFile)

            uploadTask.on('state_changed',
                (snapshot) => {
                    
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    
                },
                (error) => {
                    toast.error("Something went wrong, please try to send your image again", {
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
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        //storing the image message in realtime db
                        set(push(ref(db, 'messages/')), {
                            senderID: loggedInUser.id,
                            receiverID: activeFriend?.friendID,
                            message: "",
                            photoURL: downloadURL,
                            date: new Date().toString()
                        })
                    })
                }
            );
        }

        else if (imageFile.size >= 1000000) {
            toast.error("Image file need to be smaller than 1MB", {
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

        else {
            toast.error("Please enter an image file", {
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

                <div ref={scrollRef} className='flex flex-col gap-5 p-3'>

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
                                <div key={message.messageID} className='self-end flex flex-col gap-y-2'>

                                    <div className='self-end w-[500px] h-[300px] overflow-hidden rounded-lg'>

                                        <MessagePicture picture={message.photoURL} />

                                    </div>

                                    <span className='self-end text-[14px] text-slate-500'>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

                                </div>

                            )
                        }

                        else if (message.receiverID === loggedInUser.id && message.photoURL) {
                            return (
                                <div key={message.messageID} className='self-start flex flex-col gap-y-2'>

                                    <div className='self-start w-[500px] h-[300px] overflow-hidden rounded-lg'>

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

                        <div className='relative'>

                            <div onClick={() => setShowEmoji(prev => !prev)} className="#292D32 cursor-pointer">

                                <EmojiIcon />

                            </div>

                            {showEmoji && (
                                <div className='absolute bottom-[25px] left-[5px]'>
                                    <EmojiPicker onEmojiClick={handleAddEmoji} />
                                </div>
                            )}

                        </div>

                        <div onClick={() => fileRef.current.click()} className="#292D32 cursor-pointer">
                            <GalleryIcon />
                        </div>

                        <input type="file" ref={fileRef} onChange={handleImageFile} hidden />

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
