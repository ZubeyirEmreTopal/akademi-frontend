import logo from './logo.svg';
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import { Switch } from "react-router-dom";
import './App.css';
import Login from "./components/login/login.js"
import Navbar from './components/navbar/navbar';
import Home from './components/home-page/home';
import Register from './components/login/register';
import ForgetPassword from './components/login/forget-password-page';
import ResetPassword from './components/login/reset-password-page';
import Profile from './components/profile/profile';
import AdminPanel from './components/admin-actions/admin-panel';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Login/>}></Route>
       <Route path= "/home" element={<Home/>}></Route>
       <Route path='/register' element={<Register></Register>}></Route>
       <Route path='/forget-password-page' element={<ForgetPassword></ForgetPassword>}></Route>
       <Route path='/reset-password-page/:mytoken' element={<ResetPassword></ResetPassword>}></Route>
       <Route path='/profile' element={<Profile></Profile>}></Route>
       <Route path='/admin-panel' element={<AdminPanel></AdminPanel>}></Route>
    </Routes>
  </BrowserRouter>
     
  </div>
  );
}

export default App;
