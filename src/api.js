import axios from 'axios';
const API_URL = 'http://84.247.170.0:5000/api/v1/opportunity/';

export const getData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'accept': 'application/json',
        'X-API-KEY': '123'
      }
    });
    console.log(response.data.opportunities);  // Логируем все элементы
    return response.data.opportunities;  // Возвращаем все элементы
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

getData()
