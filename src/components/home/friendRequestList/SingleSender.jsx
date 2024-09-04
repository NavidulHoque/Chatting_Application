/* eslint-disable react/prop-types */

const SingleSender = ({ sender, handleAcceptance, handleRejection }) => {

    return (
        <div className="flex xl:flex-row flex-col xl:justify-between justify-center items-center gap-1">

            <div className="flex gap-x-2 items-center self-start">

                <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                    <img src={sender.photoURL} alt="profile pic" className="w-full h-full" />

                </div>

                <p>{sender.displayName}</p>

            </div>

            <div className="flex gap-x-2 self-end xl:self-center">

                <button onClick={() => handleAcceptance(sender)} className="w-[87px] h-[29px] rounded bg-[#4A81D3] text-white">Accept</button>

                <button onClick={() => handleRejection(sender)} className="w-[87px] h-[29px] rounded bg-[#D34A4A] text-white">Reject</button>

            </div>

        </div>
    )
}

export default SingleSender
