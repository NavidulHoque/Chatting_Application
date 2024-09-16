/* eslint-disable react/prop-types */
import Button from "../common/Button"
import ButtonContainer from "../common/ButtonContainer"
import SingleUserContainer from "../common/SingleUserContainer"
import UserDetails from "../common/UserDetails"

const SingleSender = ({ sender, handleAcceptance, handleRejection }) => {

    return (
        <SingleUserContainer>

            <UserDetails user={sender} />

            <ButtonContainer>

                <Button label="Accept" handleClick={handleAcceptance} user={sender} bgColor="bg-[#4A81D3]" />

                <Button label="Reject" handleClick={handleRejection} user={sender} bgColor="bg-[#D34A4A]" />

            </ButtonContainer>

        </SingleUserContainer>

    )
}

export default SingleSender
