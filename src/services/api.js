import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const searchCharacters = async (name) => {
  const response = await axios.get(`${BASE_URL}/character`, {
    params: { name }
  });
  console.log('ver personaje',response.data.results);
  return response.data.results;
};