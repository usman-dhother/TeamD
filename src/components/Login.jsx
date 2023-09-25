import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://your-api-endpoint/login', {
                email,
                password: btoa(password)
            });

            if (response.data && response.data.token) {
                // Store the token in local storage or handle as needed
                localStorage.setItem('authToken', response.data.token);
                // Redirect user or update state to indicate successful login
            } else {
                // Handle other responses (e.g., errors returned by your API)
                console.log(response.data.message || 'Unknown error occurred.');
            }
        } catch (err) {
            // Handle errors (e.g., network issues or invalid credentials)
            console.log(err.response?.data?.message || 'Error logging in.');
        }
    };

    return (
        <Box component="div" sx={{ width: '300px', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h4" align="center">
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    fullWidth
                    margin="normal"
                    label="Email" 
                    variant="outlined"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    fullWidth
                    margin="normal"
                    label="Password" 
                    variant="outlined"
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;
