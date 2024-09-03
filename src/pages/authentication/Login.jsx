import Lottie from "lottie-react";
import LoginAnimation from "../../animations/LoginAnimation.json"
import SignIn from "../../components/authentication/SignIn";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">

            <div className="flex gap-x-7 w-[700px]">

                <div className="w-[48%]">

                    <Lottie animationData={LoginAnimation} loop={true} />

                </div>

                <div className="w-[48%] flex items-center">

                    <SignIn />

                </div>

            </div>

        </div>
  )
}

export default Login
