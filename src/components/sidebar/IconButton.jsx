/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion';

const IconButton = ({children, path}) => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <motion.button
            onClick={() => navigate(`/${path}`)}
            className="cursor-pointer text-white"
            disabled={location.pathname === `/${path}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%"
            }}
        >
            {children}
        </motion.button>
    )
}

export default IconButton
