/* eslint-disable react/prop-types */

const UserDetails = ({user}) => {
  return (
    <div 
      className="flex gap-x-2 items-center self-start"
      
    >

      <div className="rounded-full w-[82px] h-[82px] overflow-hidden">

        <img src={user.photoURL} alt="profilePic" className="w-full h-full" />

      </div>

      <p className="text-[23px]">{user.displayName}</p>

    </div>
  )
}

export default UserDetails
