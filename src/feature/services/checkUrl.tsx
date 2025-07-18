import axios, { AxiosResponse } from 'axios';

export const checkUrl = async (url: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};
