import { Outlet } from 'react-router-dom';
// Components
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <div className='flex flex-row min-h-screen'>
        {/* --------------------------------- */}
        {/* Sidebar */}
        <Sidebar />
        {/* --------------------------------- */}
        <div className='bg-gray-100 w-full max-w-full overflow-hidden'>
          {/* --------------------------------- */}
          {/* Navbar */}
          <Navbar />
          {/* --------------------------------- */}
          <div className='p-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
