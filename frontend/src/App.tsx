import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Landing from './Pages/Landing';
import Questions from './Pages/Questions';
import Error from './Pages/Error';
import Results from './Pages/Results';

function App() {

  return (
    <BrowserRouter >
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='/results' element={<Results />} />
            <Route path='*' element={<Error/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
