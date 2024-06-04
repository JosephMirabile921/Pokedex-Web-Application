import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Grid, CardMedia } from '@mui/material';
import noImage from '../img/download.jpeg';

const Team = (props) => {
  let card = null;
  const buildCard = (charId) => {
    return (
      <Grid key={charId}>
        <Card>
          <Link to={`/pokemon/${charId}`}>
          <CardMedia
                component='img'
                image={
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${charId}.png`
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${charId}.png`
                    : noImage
                }
                title = 'teammate'
                />
          </Link>
        </Card>
      </Grid>
    );
  };
  card = props.trainer.pokemon.map((charId) => { return buildCard(charId);});
  return (
    <div>
      {card}
    </div>
  )
}

export default Team
