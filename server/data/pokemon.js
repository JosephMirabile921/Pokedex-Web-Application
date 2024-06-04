const axios = require('axios');

let exportedMethods = {
  async getPokemonPageList(offset) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
    const pokeData = data;
    return pokeData;
  },

  async getPokemonById(id) {
    if (id === undefined) throw "Error: Parameter does not exist";
    id = parseInt(id);
    if (id < 1) throw "Error: false id";
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeData = data;
    return pokeData;
  },
};

module.exports = exportedMethods;