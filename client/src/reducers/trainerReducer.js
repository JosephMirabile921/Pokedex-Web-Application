import { v4 as uuid } from 'uuid';
const initialState = [{
  id: uuid(),
  name: 'Wallace',
  select: true,
  pokemon: [350, 319, 365, 272, 260],
  isPartyFull: false,
}];

let copyState = null;
let index = 0;
let trainer = null;
let isPartyFull = null;

const trainerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'MAKE_TRAINER':
      console.log('payload', payload);
      return [...state, { id: uuid(),  name: payload.name,  select: false,  pokemon: [],  isPartyFull: false}];  // crreate a trainer

    case 'DELETE_TRAINER':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      copyState.splice(index, 1);
      return [...copyState];

    case 'SELECT_TRAINER':
      copyState = [...state];
      for (let i of copyState) {
        i.select = false;
      }
      index = copyState.findIndex((x) => x.id === payload.id);
      trainer = copyState[index];
      trainer.select = !trainer.select;
      return [...copyState];

    case 'UNSELECT_TRAINER':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      trainer = copyState[index];
      trainer.select = false;
      return [...copyState];

    case 'CATCH_POKEMON':
      copyState = [...state];
      for (let i = 0; i< copyState.length; i++ ) {
        if (copyState[i].select === true) {
            trainer = copyState[i]
        }
    }
    isPartyFull = trainer.pokemon.length < 6 ? false: true;
    if (trainer.select && !isPartyFull) {
        trainer.pokemon.push(payload.characterState.charId)
    }
    return [...copyState]; 

    case 'RELEASE_POKEMON':
      copyState = [...state];
      for (let i = 0; i < copyState.length; i++ ) {
        if (copyState[i].select === true) {
          trainer = copyState[i]
          if (trainer.select) {
            index = trainer.pokemon.findIndex((x) => x === payload.characterState.charId);
            trainer.pokemon.splice(index, 1);
            copyState[i] = trainer;
            break;
          }
        }
      }
      return [...copyState]; 

    default:
      return state;
  }
}

export default trainerReducer