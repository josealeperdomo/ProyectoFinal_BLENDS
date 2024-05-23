import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Feed } from './pages/Feed.jsx';
import { PrivateRoute } from './routes/PrivateRoutes.jsx';
import { PublicRoute } from './routes/PublicRoutes.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
          
        
        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
