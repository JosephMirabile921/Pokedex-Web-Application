import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import noImage from '../img/download.jpeg';
import {Card,CardContent,CardActions,CardMedia,Typography,CardHeader} from '@mui/material';
import '../App.css';
import actions from '../actions';

const Character = () => {
  const [characterData, setCharacterData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [unreal, setUnreal] = useState(false);
  let {id} = useParams();
  const myTrainers = useSelector((state) => state.trainers);
  const dispatch = useDispatch();
  const catchMon = async (characterState) => {dispatch(actions.catchPokemon(characterState));}
  const releaseMon = async (characterState) => {dispatch(actions.releasePokemon(characterState));}


  useEffect(() => {
    console.log('CHAR useEffect fired');
    async function fetchData() {
      try {
        setUnreal(false);
        if(!(/^\d+$/.test(id))) {
          setUnreal(true);
        }else {
          const {data} = await axios.get(`http://localhost:4000/pokemon/${id}`);
          console.log(data);
          console.log(data.name)
          setCharacterData(data);
          setLoading(false);
        }
        setLoading(false);
      } catch (e) {
        setUnreal(true);
        setLoading(false);
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }
  else if(unreal) {
    return <p>404 Pokemon Not Found</p>
  } else {
    const characterState = {
      charId: id,
      name: characterData["species"]["name"],
      caught: '',
      url: ["species"]["url"]
    }
    const theTrainer = myTrainers[myTrainers.findIndex(x => x.select)];
    const onTeam = theTrainer && theTrainer.pokemon.findIndex(x => x === id);
    const fullParty = theTrainer && theTrainer.pokemon.length < 6 ? false : true;  
    return (
      <Card variant='outlined'>
        <CardHeader title={characterData.name} />
        <CardMedia
                component='img'
                image={
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    : noImage
                }
                title='pokemon image'
              />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='span'>
            <dl>
              <p>
                <dt>Name:</dt> <br />
                  {characterData.name ?
                    <dd key={characterData.name}>{characterData.name}<br /></dd>
                    : 'N/A'}
              </p>
              <p>
              <dt> Type: </dt> <br />
                {characterData.types.length > 0 ? characterData.types.map((type) => {
                  return (<dd key={type.type.name}>{type.type.name}<br /></dd>);
                }) : 'N/A'}
              </p>
              <p>
              <dt > Stats: </dt> <br />
                {characterData.stats.length > 0 ? characterData.stats.map((stat) => {
                  return(<dd key={stat.stat.name}>{`${stat.stat.name}: ${stat.base_stat}`}<br /></dd>);
                }) : 'N/A'}
              </p>
              <p>
              <dt> Abilities: </dt> <br />
                {characterData.abilities.length > 0 ? characterData.abilities.map((ability) => {
                  return (<dd key={ability.ability.name}>{ability.ability.name}{ability.is_hidden && ' (hidden)'}<br /></dd>);
                }) : 'N/A'}
              </p>
              <p>
              <dt > Sprites: </dt> <br />
              <dd key={characterData.sprites.front_default}><img src={characterData.sprites.front_default ? characterData.sprites.front_default : noImage} alt={characterData.name}/></dd>
              <dd key={characterData.sprites.front_shiny}><img src={characterData.sprites.front_shiny ? characterData.sprites.front_shiny : noImage} alt={characterData.name}/></dd><br />
              <dd key={characterData.sprites.back_default}><img src={characterData.sprites.back_default ? characterData.sprites.back_default : noImage} alt={characterData.name}/></dd>
              <dd key={characterData.sprites.back_shiny}><img src={characterData.sprites.back_shiny ? characterData.sprites.back_shiny : noImage} alt={characterData.name}/></dd><br />
              </p>
              <p>
              <dt> Moves: </dt> <br />
                {characterData.moves.length > 0 ? characterData.moves.map((move) => {
                  return (<dd key={move.move.name}>{move.move.name}<br /></dd>);
                }) : 'N/A'}
              </p>
            </dl>
            <Link to='/pokemon/page/0'>Back</Link>
          </Typography>
        </CardContent>
        <CardActions>
            {onTeam !== -1 ? 
              <button onClick={() => { releaseMon(characterState);}}>Release</button> : 
              (fullParty ? 
                <button>Party Full</button> 
              : <button onClick={() => { catchMon(characterState);}}>Catch</button>)}
          </CardActions>
      </Card>
    );
  }
};

export default Character;
