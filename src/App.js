import{Routes,Route} from 'react-router-dom';

import './App.css';
import Navigation from './routes/navigation/navigation.jsx';
import Home from './routes/homepage/homepage.jsx'
import Footer from './routes/footer/footer'
import SignUp from './components/sign-up/sign-up.component.jsx'
import SignIn from './components/sign-in/sign-in.component.jsx'
import SignInWithPhoneNumber from './components/sign-in/sign-in-PhoneNum.component'
import RequireAuth from './features/RequireAuth'
import Dashboard from './routes/dashboard/Dashboard';
import AccountPage from './routes/account/Account';
import CardDescription from './routes/CardGameDescription/CardGameInfo';
import UserWallet from './routes/wallet/wallet';
import UserPay from './routes/Pay/userPay';
import KardHistory from './components/Game/History/KardHistory';
import NotFound from './routes/404/404.component';
import ForgotPassword from './routes/forgotPassword/forgotPassword';

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
           <Route path='verifyUser/:id' element = {<ForgotPassword />} />
           <Route path='*' element={<NotFound />} />


           <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='account' element={<AccountPage />} />
            <Route path='wallet' element={<UserWallet />} />
            <Route path='game-history' element={<KardHistory />} />
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
