import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import '../App.css';
import actions from '../actions';

const CharacterList = () => {
  const regex = /(\b\d+\b)/gi;
  const [loading, setLoading] = useState(true);
  const [charactersData, setCharactersData] = useState(undefined);
  const [disable, setDisable] = useState(false);
  const [hide] = useState(false);
  const [unkown, setUnkown] = useState(false);
  let card = null;
  const navigate = useNavigate();
  let { pagenum } = useParams();
  pagenum = parseInt(pagenum);
  const myTrainers = useSelector((state) => state.trainers);
  const dispatch = useDispatch();
  const catchMon = async (characterState) => {dispatch(actions.catchPokemon(characterState));}
  const releaseMon = async (characterState) => {dispatch(actions.releasePokemon(characterState));}


  useEffect(() => {
    console.log("on load useeffect")
    async function fetchData() {
      try {
        const {data} = await axios.get(`http://localhost:4000/pokemon/page/${pagenum}`);
        console.log(data)
        if(data.next === null){
          setDisable(true);
        }else{
          setDisable(false);
        }
        setCharactersData(data.results);
        setLoading(false);
      } catch(e) {
        setDisable(true);
        setUnkown(true)
      }
    }
    fetchData();
  }, [pagenum]);


  const buildCard = (character, characterid, characterState
    ) => {
      const theTrainer = myTrainers[myTrainers.findIndex(x => x.select)];
      const onTeam = theTrainer && theTrainer.pokemon.findIndex(x => x === characterid);
      const fullParty = theTrainer && theTrainer.pokemon.length < 6 ? false : true;
      return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={characterid}>
        <Card variant='outlined'>
          <CardActionArea>
            <Link to={`/pokemon/${characterid}`}>
              <CardMedia
                component='img'
                image={
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${characterid}.png`
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${characterid}.png`
                    : noImage
                }
                title='pokemon image'
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='h2'
                >
                  {character.name}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
          <CardActions>
            {onTeam !== -1 ? 
              <button onClick={() => { releaseMon(characterState);}}>Release</button> : 
              (fullParty ? 
                <button>Party Full</button> 
              : <button onClick={() => { catchMon(characterState);}}>Catch</button>)}
          </CardActions>
        </Card>
      </Grid>
    );
  };

  function nextPage() {
    pagenum = pagenum + 1
    navigate(`/pokemon/page/${pagenum}`);
    console.log(pagenum)
  }

  function previousPage() {
    if (pagenum > 0) {
      pagenum = pagenum - 1
      setDisable(false);
      navigate(`/pokemon/page/${pagenum}`);
    }
  }


  card = charactersData && charactersData.map((character) => {
    let characterid = character.url.match(regex);
    let pokecatch = false;
    const characterState = {
      charId: characterid[0],
      name: character.name,
      caught: pokecatch,
      url: character.url
    }
    return buildCard(character, characterid[0], characterState);
  });
  if (unkown) {
    return (
      <div>
        <h2>Page does not exist</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        {!hide && (
          <Button
          size = 'large'
          onClick={nextPage}
          disabled = {disable === true}
          variant = "contained"
          >
            Next
          </Button>
        )}
        
        {!hide && (
          <Button
          size = 'large'
          onClick={previousPage}
          disabled = {pagenum === 0}
          variant = "contained"
          >
            Previous
          </Button>
        )}
        <br />
        <br />
        <Grid container spacing={5}>
          {card}
        </Grid>
      </div>
    );
  }
}
export default CharacterList;