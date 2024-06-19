import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend server URL

export const signIn = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/signin`, { username, password });
    return response.data;
};

export const signUp = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/signup`, { username, password });
    return response.data;
};
