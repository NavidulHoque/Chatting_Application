/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const Blocked = ({isBlockerAvailable, isBlockeeAvailable, blockees, blockers, activeFriend}) => {
    const [blocker, setBlocker] = useState(null)
    const [blockee, setBlockee] = useState(null)

    useEffect(() => {

      if (isBlockerAvailable) {
        const blocker = blockers.find(blocker => blocker?.blockerID === activeFriend?.friendID)
        setBlocker(blocker)
      }

      else if (isBlockeeAvailable) {
        const blockee = blockees.find(blockee => blockee?.blockeeID === activeFriend?.friendID)
        setBlockee(blockee)
      }
    
    }, [isBlockerAvailable, isBlockeeAvailable, blockers, blockees, activeFriend])
    
  return (
    <div className="bg-[rgba(255,255,255,0.8)] flex justify-center items-center fixed top-[95px] z-10 w-[870px] h-[591px]">

        {isBlockeeAvailable && <h1 className="text-[30px] text-blue-600 font-semibold">Unblock {blockee?.blockeeName} to chat further</h1>}

        {isBlockerAvailable && <h1 className="text-[30px] text-blue-600 font-semibold">{blocker?.blockerName} blocked you, you can't message any further</h1>}
      
    </div>
  )
}

export default Blocked
