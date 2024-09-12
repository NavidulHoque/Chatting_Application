import { Outlet } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
  const user = useSelector(state => state.UserLogin.user)
  return (
    <>
      <ToastContainer />
      <div className='h-screen flex overflow-hidden font-interRegular'>

        {user && <Sidebar />}
        <Outlet />

      </div>
    </>
  )
}

export default RootLayout
