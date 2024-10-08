/* eslint-disable no-unused-vars */
import { ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import SignUp from "../../components/authentication/SignUp";

const Registration = () => {
    return (
        <>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col justify-center items-center h-screen box-border">

                <h1 className='font-jotiRegular text-[80px]'>TalkNest</h1>

                <div className="md:w-[560px] w-[90vw] h-[800px] flex items-center rounded-md shadow-[0_4px_18px_#0000000F] sm:px-[50px] px-[30px]">

                    <SignUp />

                </div>

            </div>
        </>
    )
}

export default Registration
