import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// APIs
import { isUserActive } from './apis/fakeAuthProvider';
import { menus } from './apis/menusAPI';
import { langs } from './apis/languagesAPI';
// Context
import { GlobalContext } from './contexts/globalContext';
// Components
import Layout from './components/Layout';
// Pages
import ErrorPage from './error-page';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DataTableSamplePage from './pages/DataTableSamplePage/index';
import DatePickerSamplePage from './pages/DatePickerSamplePage/index';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const companyName = 'TidBug.Project';

  useEffect(() => {
    loadDefaultLang();
    // redirectAuth();
  }, []);

  // const redirectAuth = () => {
  //   if (isUserActive()) {
  //     navigate('/');
  //   } else {
  //     navigate('/login');
  //   }
  // };

  const loadDefaultLang = () => {
    const lang = localStorage.getItem('lang');

    if (!lang) {
      const langDefault = langs.find((obj) => obj.default);
      localStorage.setItem('lang', JSON.stringify(langDefault));
    }
  };

  return (
    <>
      <GlobalContext.Provider
        value={{ showMenu, setShowMenu, menus, companyName, langs }}
      >
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<Layout />}>
            <Route path='/' element={<DashboardPage />} />
            <Route
              path='/data-table-sample'
              element={<DataTableSamplePage />}
            />
            <Route
              path='/date-picker-sample'
              element={<DatePickerSamplePage />}
            />
          </Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
