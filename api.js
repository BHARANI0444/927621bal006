import axios from 'axios';

const fetchNumbers = async (numberId) => {
  try {
    const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching numbers:', error);
    throw error;
  }
};

export { fetchNumbers };
