/* eslint-disable react/prop-types */

const MessagePicture = ({picture}) => {
  return (
    <img className='rounded-lg object-contain' src={picture} alt='image' />
  )
}

export default MessagePicture
