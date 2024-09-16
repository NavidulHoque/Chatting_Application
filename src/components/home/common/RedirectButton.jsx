/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const RedirectButton = ({ label, path }) => {
    const navigate = useNavigate();
    return (
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%"
            }}
            onClick={() => navigate(`/${path}`)}
            className="bg-[rgb(50,50,50)] text-white text-[24px] p-[10px] rounded-md hover:bg-black"
        >
            {label}
        </motion.button>
    )
}

export default RedirectButton
