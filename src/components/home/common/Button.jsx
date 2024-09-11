/* eslint-disable react/prop-types */

const Button = ({label, handleClick, user, bgColor}) => {
    return (
        <button
            onClick={() => handleClick(user)}
            className={`w-[75px] h-[29px] rounded ${bgColor} text-white`}
        >
            {label}
        </button>
    )
}

export default Button
