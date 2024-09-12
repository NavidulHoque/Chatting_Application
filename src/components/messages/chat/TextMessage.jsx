/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const TextMessage = ({ message, alignSelf, messageColor }) => {
    return (
        <motion.div
            className={`${alignSelf} flex flex-col`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >

            <p className={`${alignSelf} ${messageColor} inline-block text-white px-3 py-[8px] rounded-lg`}>{message.message}</p>

            <span className={`${alignSelf} text-[14px] text-slate-500`}>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

        </motion.div>
    )
}

export default TextMessage
