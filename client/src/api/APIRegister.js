import axios from 'axios';

const apiUrl = 'http://103.239.171.133:5005';




export const REGISTER = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, data);
    return response.data;
  } catch (error) {
    console.log('Error registering:', error);
    throw error;
  }
};