/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const Button = ({ label, handleClick, user, bgColor }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%"
            }}
            onClick={(e) => {
                e.stopPropagation()
                handleClick(user)
            }}
            className={`lg:w-[120px] w-[100px] h-[41px] rounded ${bgColor} text-white`}
        >
            {label}
        </motion.button>
    )
}

export default Button
