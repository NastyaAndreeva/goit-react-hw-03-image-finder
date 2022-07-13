import axios from 'axios';
import { BASE_URL, API_KEY } from 'constants/constants';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getImages = async params => {
  try {
    const response = await instance.get(``, {
      params: { ...params, key: API_KEY },
    });
    return response.data.hits;
  } catch (error) {
    return error;
  }
};
