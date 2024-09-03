import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
  const user = useSelector(state => state.UserLogin.user)
  return (
    <>
    <ToastContainer />
      <div className='relative h-screen bg-[#E8E8E8]'>

        <div className='bg-[#4A81D3] h-[300px]'></div>

        <div className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] xl:w-[1250px] w-[95vw] ${user ? "bg-white" : "bg-[#FBFBFB]"}`}>

          {user && <Navbar />}
          <Outlet />

        </div>

      </div>
    </>
  )
}

export default RootLayout
