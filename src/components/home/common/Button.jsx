/* eslint-disable react/prop-types */

const Button = ({label, handleClick, user}) => {
    return (
        <button
            onClick={() => handleClick(user)}
            className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
        >
            {label}
        </button>
    )
}

export default Button
