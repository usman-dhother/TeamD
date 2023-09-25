import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setError(null);

        try {
            const response = await axios.post('https://your-api-endpoint/signup', {
                email,
                password: btoa(password),
                firstName,
                lastName
            });

            if (response.data && response.data.success) {
                // Handle success, e.g., redirect or show a success message
            } else {
                // Handle other responses (e.g., errors returned by your API)
                setError(response.data.message || 'Unknown error occurred.');
            }
        } catch (err) {
            // Handle errors (e.g., network issues or invalid input)
            setError(err.response?.data?.message || 'Error signing up.');
        }
    };

    return (
        <Box component="div" sx={{ width: '300px', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h4" align="center">
                Signup
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    fullWidth
                    margin="normal"
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField 
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <TextField 
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Signup
                </Button>
            </form>
            {error && <div className="error">{error}</div>}
        </Box>
    );
};

export default Signup;
