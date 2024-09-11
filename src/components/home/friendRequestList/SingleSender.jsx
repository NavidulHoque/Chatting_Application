/* eslint-disable react/prop-types */

import Button from "../common/Button"
import UserDetails from "../common/UserDetails"

const SingleSender = ({ sender, handleAcceptance, handleRejection }) => {

    return (
        <div className="flex xl:flex-row flex-col xl:justify-between justify-center items-center gap-1">

            <UserDetails user={sender} />

            <div className="flex gap-x-2 self-end xl:self-center">

                <Button label="Accept" handleClick={handleAcceptance} user={sender} bgColor="bg-[#4A81D3]" />

                <Button label="Reject" handleClick={handleRejection} user={sender} bgColor="bg-[#D34A4A]" />

            </div>

        </div>
    )
}

export default SingleSender
