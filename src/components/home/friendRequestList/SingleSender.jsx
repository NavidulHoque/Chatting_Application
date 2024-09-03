/* eslint-disable react/prop-types */

const SingleSender = ({sender}) => {
  return (
    <div className="flex justify-between items-center">

                        <div className="flex gap-x-2 items-center">

                            <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                                <img src={sender.photoURL || avatar} alt="profile pic" className="w-full h-full" />

                            </div>

                            <p>{sender.displayName}</p>

                        </div>

                        <div className="flex gap-x-2">

                            <button onClick={() => handleAcceptance(sender)} className="w-[87px] h-[29px] rounded bg-[#4A81D3] text-white">Accept</button>

                            <button onClick={() => handleRejection(sender)} className="w-[87px] h-[29px] rounded bg-[#D34A4A] text-white">Reject</button>

                        </div>

                    </div>
  )
}

export default SingleSender
