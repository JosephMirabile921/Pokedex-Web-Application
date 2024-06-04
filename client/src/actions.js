const makeTrainer = (name) => ({
    type: 'MAKE_TRAINER',
    payload: {
      name: name,
    }
  })
  
  const deleteTrainer = (id) => ({
    type: 'DELETE_TRAINER',
    payload: { id: id }
  })
  
  const selectTrainer = (id) => ({
    type: 'SELECT_TRAINER',
    payload: { id: id }
  })
  
  const unselectTrainer = (id) => ({
    type: 'UNSELECT_TRAINER',
    payload: { id: id }
  })
  
  const catchPokemon = (characterState) => ({
    type: 'CATCH_POKEMON',
    payload: { 
      characterState: characterState,
    }
  })
  
  const releasePokemon = (characterState) => ({
    type: 'RELEASE_POKEMON',
    payload: { 
      characterState: characterState,
    }
  })
  
  
  const partyFull = (id) => ({
    type: 'PARTY_FULL',
    payload: { 
      id: id,
    }
  })
  
  module.exports = {
    makeTrainer,
    deleteTrainer,
    selectTrainer,
    unselectTrainer,
    catchPokemon,
    releasePokemon,
    partyFull,
  };