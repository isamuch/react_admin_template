import { useContext, useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// Contexts
import { GlobalContext } from '../contexts/globalContext';
// Components
import FormatIndentDecreaseOutlinedIcon from '@mui/icons-material/FormatIndentDecreaseOutlined';
import FormatIndentIncreaseOutlinedIcon from '@mui/icons-material/FormatIndentIncreaseOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { Menu, Transition } from '@headlessui/react';
// APIs
import { fakeSignout } from '../apis/fakeAuthProvider';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { i18n } = useTranslation();
  const { showMenu, setShowMenu, langs } = useContext(GlobalContext);
  const [lang, setLang] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const langDef = JSON.parse(localStorage.getItem('lang'));
    setLang(langDef.short);
  }, []);

  const changeLang = (objLang) => {
    localStorage.setItem('lang', JSON.stringify(objLang));
    setLang(objLang.short);
    i18n.changeLanguage(objLang.short);
  };

  return (
    <div className='h-14 px-4 flex items-center border-b border-gray-100 bg-white'>
      <div className='flex grow'>
        <NavbarIcons
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          {showMenu ? (
            <FormatIndentDecreaseOutlinedIcon fontSize='small' />
          ) : (
            <FormatIndentIncreaseOutlinedIcon fontSize='small' />
          )}
        </NavbarIcons>
      </div>
      <div className='flex gap-2 items-center justify-center'>
        <Menu as='div' className='relative'>
          <Menu.Button>
            <div className='bg-gray-100 text-xs font-bold flex items-center justify-center leading-9 w-9 rounded-md hover:cursor-pointer hover:bg-gray-200 uppercase'>
              {lang}
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10'>
              {langs.map((obj) => (
                <div className='p-1' key={obj.short}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? 'bg-blue-100 text-gray-900 font-semibold'
                            : 'text-gray-900'
                        } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm ${
                          lang === obj.short
                            ? 'bg-blue-100 text-gray-900 font-semibold'
                            : 'text-gray-900'
                        }`}
                        key={obj.short}
                        onClick={() => {
                          changeLang(obj);
                        }}
                      >
                        {obj.name}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as='div' className='relative'>
          <Menu.Button>
            <NavbarIcons>
              <WbSunnyOutlinedIcon fontSize='small' />
            </NavbarIcons>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10'>
              <div className='p-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-blue-100 text-gray-900 font-semibold'
                          : 'text-gray-900'
                      } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm`}
                    >
                      Dark Mode
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className='p-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-blue-100 text-gray-900 font-semibold'
                          : 'text-gray-900'
                      } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm`}
                    >
                      Light Mode
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div
          className='flex items-center justify-center px-2 py-1 rounded-md hover:bg-gray-100 hover:cursor-pointer'
          onClick={() => {
            fakeSignout();
            navigate('/login');
          }}
        >
          <div className='flex flex-col items-end justify-end'>
            <div className='text-xs font-bold'>Samuch Jun.</div>
            <div className='text-xs font-normal tracking-wider'>
              Full-Stack Developer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NavbarIcons = ({ children, onClick }) => {
  return (
    <div
      className='bg-gray-100 p-2 rounded-md flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

NavbarIcons.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

export default Navbar;
