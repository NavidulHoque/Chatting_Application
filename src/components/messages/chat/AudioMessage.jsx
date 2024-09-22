/* eslint-disable react/prop-types */

const AudioMessage = ({message, alignSelf}) => {
  return (
    <audio controls className={`${alignSelf}`}>
      <source src={message.audioMessage} type="audio/mpeg" />
    </audio>
  )
}

export default AudioMessage
