import axiosInstance from './axiosInstance.js';

export async function fetchHealth() {
  const response = await axiosInstance.get('/health');
  return response.data;
}