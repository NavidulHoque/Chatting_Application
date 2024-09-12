import { ToastContainer } from "react-toastify";
import SignIn from "../../components/authentication/SignIn";
import { Helmet } from "react-helmet-async";

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <ToastContainer />
            <div className="flex flex-col justify-center items-center h-screen box-border">

                <h1 className='font-jotiRegular text-[80px]'>TalkNest</h1>

                <div className="w-[560px] h-[600px] flex items-center rounded-md shadow-[0_4px_11px_#0000001C] px-[50px]">

                    <SignIn />

                </div>

            </div>
        </>
    )
}

export default Login
