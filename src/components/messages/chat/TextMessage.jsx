/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns';

const TextMessage = ({message, alignSelf, messageColor}) => {
    return (
        <div className={`${alignSelf} flex flex-col`}>

            <p className={`${alignSelf} ${messageColor} inline-block text-white px-3 py-[8px] rounded-lg`}>{message.message}</p>

            <span className={`${alignSelf} text-[14px] text-slate-500`}>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

        </div>
    )
}

export default TextMessage
