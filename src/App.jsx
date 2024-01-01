import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ServicesList, { UserContext } from './components/services/servicesList';
import MeetingList from './components/meetings/mettingList';
import AdminLogin from './components/login/adminLogin';
import UserPage from './components/userPage';
import LoginPage from './components/login/loginPage';


export default function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>{/**switch */}

          <Route path={""} element={<UserPage />}></Route>

          <Route path={"admin"} element={<AdminLogin />}>

            <Route path={'services'} element={<UserContext.Provider value={{ isAdmin: true }}><ServicesList /> </UserContext.Provider>}></Route>
            <Route path={'meetings'} element={<MeetingList />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>)
};


















