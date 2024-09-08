/* eslint-disable react/prop-types */

const MessagePicture = ({picture}) => {
  return (
    <img className='rounded-lg object-cover object-bottom' src={picture} alt='image' />
  )
}

export default MessagePicture
