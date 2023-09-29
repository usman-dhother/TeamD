import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk for logging in
export const loginUserAsync = createAsyncThunk(
    'auth/loginUserAsync',
    async (credentials, thunkAPI) => {
        const { email, password } = credentials;
        try {
            const response = await axios.post("https://your-api-endpoint/login", {
                email,
                password: btoa(password)
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error logging in.");
        }
    }
);

// For Signup
export const signupUserAsync = createAsyncThunk(
    'auth/signupUserAsync',
    async (credentials, thunkAPI) => {
        const { email, password, firstName, lastName } = credentials;
        try {
            const response = await axios.post("https://your-api-endpoint/signup", {
                email,
                password: btoa(password),
                firstName,
                lastName
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error signing up.");
        }
    }
);

// For Forgot Password
export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgotPasswordAsync',
    async (email, thunkAPI) => {
        try {
            const response = await axios.post("https://your-api-endpoint/forgot-password", {
                email
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error sending reset link.");
        }
    }
);
