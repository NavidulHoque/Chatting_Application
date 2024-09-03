/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import RegAnimation from "../../animations/RegAnimation.json"
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import SignUp from "../../components/authentication/SignUp";

const Registration = () => {
    return (
        <>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <ToastContainer />
            <div className="flex justify-center items-center h-screen">

                <div className="flex gap-x-7 w-[700px]">

                    <div className="w-[48%]">

                        <Lottie animationData={RegAnimation} loop={true} />

                    </div>

                    <div className="w-[48%] flex items-center">

                        <SignUp toast={toast} />

                    </div>

                </div>

            </div>
        </>
    )
}

export default Registration
