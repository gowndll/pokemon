import axios from "axios";

export const GetPokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
})

export const GetDetailFromId = async (id) => {
  try {
    // const response = await GetPokeAPI.get(`pokemon/${id}`);
    const [response1, response2] = await axios.all([
      GetPokeAPI.get(`pokemon/${id}`),
      GetPokeAPI.get(`pokemon-species/${id}`),
    ]);
    return {response1: response1.data, response2: response2.data}
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const GetDetailInfo = async (url) => {
  try {
    const response = await GetPokeAPI.get(url);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};
