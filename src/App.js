import{Routes,Route} from 'react-router-dom';

import './App.css';
import Navigation from './routes/navigation/navigation.jsx';
import Home from './routes/homepage/homepage.jsx'
import Footer from './routes/footer/footer'
import SignUp from './components/sign-up/sign-up.component.jsx'
import SignIn from './components/sign-in/sign-in.component.jsx'
import SignInWithPhoneNumber from './components/sign-in/sign-in-PhoneNum.component'
import RequireAuth from './features/RequireAuth'
import LoginPage from './components/login-page/loginPage';
import AccountPage from './routes/user/accountPage';
import FetchData from './routes/user/UserPage';
import CardDescription from './routes/CardGameDescription/CardGameInfo';
import UserWallet from './routes/wallet/wallet';
import UserPay from './routes/Pay/userPay';
import Dashboard from './components/dasboard/Dashboard';

function App() {
  return (
    <div className="App">
     <div className='wrapper'>
         <Routes>
           <Route index element= {<Home />} />
           <Route path='/' element={<Navigation/>}>
           <Route path='sign-up' element ={<SignUp />} />
           <Route path='sign-in' element ={<SignIn />} />
           <Route path='SignInWithPhoneNumber' element ={<SignInWithPhoneNumber />} />
           <Route path='card/:cardId' element ={<CardDescription/>} />


           <Route element={<RequireAuth />}>
            <Route path='welcome' element={<LoginPage />} />
            <Route path='user' element={<FetchData />}  />
            <Route path='account-page' element={<AccountPage />} />
            <Route path='wallet' element={<UserWallet />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='Pay/:cardId' element= {<UserPay />} />
           </Route>
           </Route>
         </Routes>
       </div>
       <div className='footer'><Footer/></div>
    </div>
  );
}

export default App;
