import { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
// Contexts
import { GlobalContext } from '../contexts/globalContext';
// Constants
import { BREAKPOIN_UI } from '../constant/ui';
// Icon
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

function Menus() {
  const { setShowMenu, menus } = useContext(GlobalContext);
  const location = useLocation();
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
      {menus.map((menu, idx) => {
        {
          return (
            <TitleMenu name={menu.title} key={idx}>
              {menu.menus.map((obj, idx) => {
                return (
                  <Link
                    to={obj.path}
                    key={idx}
                    onClick={() => {
                      if (windowWidth < BREAKPOIN_UI) {
                        setShowMenu(false);
                      }
                    }}
                  >
                    <Menu
                      name={obj.name}
                      active={location.pathname === obj.path}
                    >
                      <MenuSelecterIcon name={obj.path} />
                    </Menu>
                  </Link>
                );
              })}
            </TitleMenu>
          );
        }
      })}
    </>
  );
}

// ---------------------------
// Sub-Component
// ---------------------------

const TitleMenu = ({ name, children }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='pl-6 pb-3 text-xs font-medium text-gray-400 tracking-wide'>
        {t(`menusTitle.${name}`)}
      </div>
      {children}
    </div>
  );
};

const Menu = ({ name, active, children }) => {
  const { t } = useTranslation();
  const activeMenuStyle = active ? 'bg-blue-100' : '';
  return (
    <div
      className={`ml-4 mr-6 my-1 p-2 flex gap-3 items-center rounded-md hover:bg-blue-100 hover:cursor-pointer ${activeMenuStyle}`}
    >
      {children}
      <div className='text-gray-800 text-base tracking-tight'>
        {t(`menus.${name}`)}
      </div>
    </div>
  );
};

const MenuSelecterIcon = ({ name }) => {
  const iconSize = 'small';

  switch (name) {
    case '/':
      return <SpaceDashboardOutlinedIcon fontSize={iconSize} />;
    case '/login':
      return <LoginOutlinedIcon fontSize={iconSize} />;
    case '/register':
      return <AppRegistrationOutlinedIcon fontSize={iconSize} />;
    case '/404':
      return <GppBadOutlinedIcon fontSize={iconSize} />;
    case '/data-table-sample':
      return <TableChartOutlinedIcon fontSize={iconSize} />;
    case '/date-picker-sample':
      return <CalendarMonthOutlinedIcon fontSize={iconSize} />;
  }
};

// ---------------------------
// PropTypes
// ---------------------------

TitleMenu.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

Menu.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

MenuSelecterIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Menus;
