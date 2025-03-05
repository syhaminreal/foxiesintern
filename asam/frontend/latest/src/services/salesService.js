import axios from 'axios';

export const getSalesData = async () => {
  try {
    const response = await axios.get('/api/sales'); // Mock API call
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
};
