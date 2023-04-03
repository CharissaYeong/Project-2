import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Home from './pages/home';
import Auth from './components/auth';
import StoryHome from './components/storyhome';

function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={ <Landing /> } />
    <Route path='/Home' element={ <Home /> } />
    <Route path='/Auth' element={ <Auth /> } />
    <Route path='/storyhome' element={ <StoryHome /> } />
  </Routes>
  </>
  )
}

export default App;