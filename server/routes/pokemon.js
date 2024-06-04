const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;

const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


router.get('/page/:pagenum', async (req, res) => {
  try {
    const parId = req.params.pagenum.toString();
    const pagenum = req.params.pagenum
    const offset = ((pagenum)*20)
    const pokePageString = ("pokePage"+parId);
    const cachepage = await client.existsAsync(pokePageString);
    console.log(cachepage);
    if (cachepage === 0) { 
      const pokemonPage = await pokemonData.getPokemonPageList(parseInt(offset));
      const stringPage = JSON.stringify(pokemonPage)
      await client.lpushAsync("resultsPage", stringPage)
      await client.set(pokePageString, stringPage);
      res.json(pokemonPage);
    } else {
      let cachee = await client.getAsync(pokePageString);
      const parsePage = JSON.parse(cachee)
      await client.lpushAsync("resultsPage", cachee)
      res.json(parsePage);
    }
  } catch (e) {
    res.status(404).json({error: "Error", text: req.params.pagenum});
  }
});


router.get('/:id', async (req, res) => {
  try {
    const parId = req.params.id.toString();
    const pokeString = ("poke"+parId)
    console.log(pokeString)
    const cached = await client.existsAsync(pokeString)
    console.log(cached)
    if (cached === 0) {
      const pokemon = await pokemonData.getPokemonById(req.params.id);
      const stringPoke = JSON.stringify(pokemon);
      await client.lpushAsync("results", stringPoke)
      await client.set(pokeString, stringPoke)
      res.json(pokemon);
    } else {
      let cachee = await client.getAsync(pokeString);
      const parsePoke = JSON.parse(cachee);
      await client.lpushAsync("results", cachee)
      res.json(parsePoke);
    }
  } catch (e) {
    res.status(404).json({error: "Error", text: req.params.id});
  }
});


module.exports = router;
