/* eslint-disable react/prop-types */

const MessagePicture = ({picture}) => {
  return (
    <img className='w-full h-auto rounded-lg object-contain object-right' src={picture} alt='image' />
  )
}

export default MessagePicture
