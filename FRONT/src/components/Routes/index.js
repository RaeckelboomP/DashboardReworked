import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Profil from '../../pages/Profil';
import Login from '../../pages/Login';

const index = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/login' element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace={true}/>} />
            </Routes>
        </Router>
    );
};

export default index;