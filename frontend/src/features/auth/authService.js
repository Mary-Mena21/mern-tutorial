import axios from 'axios';

const API_URL = '/api/users/';
//const API_URL = 'http://localhost:5000/api/users';

//Register function
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data.error) { 
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data
}
const authService = {
    register
}

export default authService;