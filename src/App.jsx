import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

//components
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Add more routes as needed */}
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
