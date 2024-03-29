import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Context
import { GlobalContext } from '../contexts/globalContext';
// Constant
import { BREAKPOIN_UI } from '../constant/ui';
// Components
import { Transition } from '@headlessui/react';
import Drawer from '@mui/material/Drawer';
import Menus from './Menus';

function Sidebar() {
  const { showMenu, setShowMenu, companyName } = useContext(GlobalContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <>
      <Drawer
        open={showMenu && windowWidth < BREAKPOIN_UI}
        onClose={() => {
          setShowMenu(false);
        }}
        className='lg:hidden'
      >
        <MenuLayout logo={companyName}>
          <Menus />
        </MenuLayout>
      </Drawer>

      <Transition
        show={showMenu && windowWidth >= BREAKPOIN_UI}
        enter='transition-all ease-in-out duration-300'
        enterFrom='w-0'
        enterTo='w-64'
        leave='transition-all ease-in-out duration-300'
        leaveFrom='w-64'
        leaveTo='w-0'
      >
        <div className={'hidden lg:block w-full overflow-hidden'}>
          <MenuLayout logo={companyName}>
            <Menus />
          </MenuLayout>
        </div>
      </Transition>
    </>
  );
}

const MenuLayout = ({ children, logo }) => {
  return (
    <>
      <div className='w-64 min-h-screen border-r border-gray-100'>
        <div className='flex flex-col'>
          <div className='pl-6 flex h-14 items-center'>
            <p className='font-medium text-xl tracking-widest'>{logo}</p>
          </div>
          <div className='flex flex-col pt-4 gap-3 max-h-[calc(100vh-56px)] overflow-auto no-scrollbar'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

MenuLayout.propTypes = {
  children: PropTypes.element.isRequired,
  logo: PropTypes.string,
};

export default Sidebar;
