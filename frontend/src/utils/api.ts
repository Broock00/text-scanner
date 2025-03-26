import axios from 'axios';

export const scanText = async (image: string): Promise<string> => {
  try {
    const response = await axios.post('/api/scan/', { image });
    return response.data.text;
  } catch (error) {
    console.error('Error scanning text:', error);
    throw error;
  }
};