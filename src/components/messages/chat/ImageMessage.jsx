/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns';

const ImageMessage = ({message, alignSelf}) => {
    return (
        <div className={`${alignSelf} flex flex-col gap-y-2`}>

            <div
                className={`${alignSelf} sm:w-[300px] w-[200px] sm:h-[250px] h-[150px] bg-cover bg-center rounded-lg`}
                style={{ backgroundImage: `url(${message.photoURL})` }}
            >

            </div>

            <span className={`${alignSelf} text-[14px] text-slate-500`}>{formatDistanceToNow(new Date(message.date), { addSuffix: true })}</span>

        </div>
    )
}

export default ImageMessage
