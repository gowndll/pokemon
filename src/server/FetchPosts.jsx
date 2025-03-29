import axios from "axios";

const POKEMON_LENGTH = 10;
const pokemonSpecies = Array.from({length: POKEMON_LENGTH}, (_, i) => `https://pokeapi.co/api/v2/pokemon-species/${i+1}`); 
const pokemonDefault = Array.from({length: POKEMON_LENGTH}, (_, i) => `https://pokeapi.co/api/v2/pokemon/${i+1}`); 

export const pokemonSpeciesData = async () => {
  const responses = await axios.all(pokemonSpecies.map((url, idx) => axios.get(url)));
  if(!responses) {
    throw new Error('pokemonSpeciesData Error')
  }
  const responseEntry = responses.map(response=> ({'flavor_text_entries':response.data.flavor_text_entries}));
  const responseNames = responses.map(response=> ({'names':response.data.names}));
  const responseCustoms = responseEntry.map((data, idx) => ({...data, ...responseNames[idx]}))
  return responseCustoms;
}

export const pokemonDefaultData = async () => {
  try {
    const responses = await axios.all(pokemonDefault.map((url, idx) => axios.get(url)));
    const speciesdata = await pokemonSpeciesData();
    if(!responses || !speciesdata) {
      throw new Error('pokemonDefaultData Error')
    }
    
    const mergedData = responses.map((response, index) => ({
      ...response.data,
      ...(speciesdata[index] || {}), // ✅ details[index]가 undefined일 경우 빈 객체로 처리
    }));
    return mergedData;
  } catch (error) {
    console.error(error)
  }
}