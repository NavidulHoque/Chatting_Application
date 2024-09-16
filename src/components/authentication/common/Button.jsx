/* eslint-disable react/prop-types */
import { BeatLoader } from "react-spinners"

const Button = ({loading, label}) => {
    return (
        <button
            type="submit"
            className="md:w-[460px] w-full h-[60px] hover:bg-black bg-[#313131] text-white text-[20px] rounded-lg"
            disabled={loading}
        >
            {loading ? <BeatLoader color="#fff" size={10} /> : label}
        </button>
    )
}

export default Button
