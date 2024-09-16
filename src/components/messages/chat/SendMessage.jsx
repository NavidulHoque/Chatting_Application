/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import EmojiIcon from '../../../icons/EmojiIcon';
import GalleryIcon from '../../../icons/GalleryIcon';
import EmojiPicker from 'emoji-picker-react';
import { Bounce, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref as Ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, push, ref, set } from 'firebase/database';
import MicrophoneIcon from './../../../icons/MicrophoneIcon';

const SendMessage = ({loggedInUser, activeFriend}) => {
    const [message, setMessage] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const storage = getStorage()
    const db = getDatabase()
    const fileRef = useRef(null)

    function handleSendMessage() {

        if (message !== "") {
            //storing the data in the database
            set(push(ref(db, 'messages/')), {
                senderID: loggedInUser.id,
                receiverID: activeFriend?.friendID,
                message,
                photoURL: "",
                date: new Date().toString()
            })

            setMessage("")
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
        setMessage(prev => prev + emoji)
    }

    function handleSendImage(e) {
        const file = e.target.files[0]
        const isImageFile = file.type.includes("image")

        if (isImageFile && file.size < 1000000) {

            const imageFile = file

            const uniqueId = uuidv4()
            const fileName = `${uniqueId}_${imageFile.name}`;

            const storageRef = Ref(storage, `${loggedInUser.displayName} = messageImages/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, imageFile)

            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                },
                () => {
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

        else if (file.size >= 1000000) {
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
            })
        }
    }

    return (
        <div className="sm:bg-white sm:h-[15%] h-[11%] rounded-b-md flex items-center justify-center">

            <div className="bg-[#F5F5F5] sm:w-[90%] w-full self-end sm:self-center flex items-center justify-between gap-x-3 p-[10px] rounded-md">

                <div className="flex gap-x-3">

                    <div className="#292D32 cursor-pointer">
                        <MicrophoneIcon />
                    </div>

                    <div className='relative'>

                        <div onClick={() => setShowEmoji(prev => !prev)} className="#353535 cursor-pointer">

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

                    <input type="file" ref={fileRef} onChange={handleSendImage} hidden />

                </div>

                <input
                    type="text"
                    className='bg-[#F5F5F5] text-[20px] outline-none pb-[3px] w-[80%]'
                    placeholder='type here...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? handleSendMessage() : ""}
                />

                <button onClick={handleSendMessage} className='bg-[#3E8DEB] text-white text-[20px] rounded-lg w-[134px] h-[54px]'>Send</button>

            </div>

        </div>
    )
}

export default SendMessage
