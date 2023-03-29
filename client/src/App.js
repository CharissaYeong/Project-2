import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Home from './pages/home';
import Register from './components/register';
import Test from './pages/test';

function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={ <Landing /> } />
    <Route path='/Home' element={ <Home /> } />
    <Route path='/Register' element={ <Register /> } />
    <Route path='/Test' element={ <Test /> } />
  </Routes>
  </>
  )
}

export default App;