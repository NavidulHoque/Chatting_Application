/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon"
import GalleryUploadIcon from '../icons/GalleryUploadIcon';
import ImageCropper from "./ImageCropper";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { LogIn } from "../features/slices/userLoginSlice";
import { Bounce, toast } from "react-toastify";
import { child, update, ref as Ref, getDatabase } from "firebase/database";
import updateFriendRequestField from "../functions/updateFriendRequestField";
import updateFriendField from "../functions/updateFriendField";

const UploadImage = ({ setOpen }) => {
    const loggedInUser = useSelector(state => state.UserLogin.user)
    const db = getDatabase()
    const fileRef = useRef()
    const [image, setImage] = useState();
    const cropperRef = useRef()
    const [loading, setLoading] = useState(false)
    const storage = getStorage()
    const auth = getAuth()
    const [storageRef, setStorageRef] = useState(null)
    const dispatch = useDispatch()

    const handleChange = (e) => {

        e.preventDefault()

        let file
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0]
        }

        else if (e.target) {
            file = e.target.files[0]
        }

        const isImageFile = file.type.includes("image")

        if (isImageFile) {

            const imageFile = file

            const newStorageRef = ref(storage, `${loggedInUser.displayName} = profileImage/${imageFile}`)
            setStorageRef(newStorageRef)
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result)
            };
            reader.readAsDataURL(imageFile)
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

    const getCropData = () => {
        setLoading(true)
        if (typeof cropperRef.current?.cropper !== "undefined") {

            //uploading in firebase
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
            uploadString(storageRef, message4, 'data_url')
                .then(() => {

                    //fetching the photo url from firebase
                    getDownloadURL(storageRef)
                        .then((downloadURL) => {

                            //updating user profile in firebase
                            updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            })
                                .then(() => {

                                    //updating in the users field
                                    const userRef = child(Ref(db), `users/${loggedInUser.id}`);
                                    return update(userRef, { photoURL: downloadURL })

                                })
                                .then(() => {

                                    //changes in the front end
                                    dispatch(LogIn({ ...loggedInUser, photoURL: downloadURL }))
                                    setLoading(false)
                                    setOpen(false)

                                    updateFriendRequestField(loggedInUser, downloadURL)
                                })
                                .then(() => {
                                    updateFriendField(loggedInUser, downloadURL)
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
                        })

                })
        }
    }

    return (
        <>
            <div className="fixed top-0 w-full z-30 bg-[rgba(0,0,0,0.4)] h-screen flex items-center justify-center ">

                <div className="bg-white xl:w-[25%] md:w-[40%] w-[80%] rounded-md p-[10px] space-y-4">

                    <div className="relative">

                        <h2 className="text-[20px] text-center">Upload Photo</h2>

                        <div onClick={() => setOpen(false)} className="absolute top-0 right-0 cursor-pointer">

                            <CrossIcon />

                        </div>

                    </div>

                    <div className="w-full h-[200px] border-[1px] border-black rounded-md p-[10px]">

                        <div onClick={() => fileRef.current.click()} className="bg-slate-300 h-full flex flex-col items-center justify-center rounded-md cursor-pointer">

                            <div className="text-[#292D32]">

                                <GalleryUploadIcon />

                            </div>

                            <p className="text-[18px]">Upload your profile picture</p>

                            <input type="file" ref={fileRef} onChange={(e) => handleChange(e)} hidden />

                        </div>

                    </div>

                </div>

            </div>

            {image && <ImageCropper image={image} setImage={setImage} cropperRef={cropperRef} getCropData={getCropData} loading={loading} />}
        </>
    )
}

export default UploadImage
