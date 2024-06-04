import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';

const MakeTrainer = () => {
  const dispatch = useDispatch();
  const [trainerForm, setTrainerForm] = useState({ name: '' });
  const setting = (e) => { e.persist(); setTrainerForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));}
  const makeTrainer = () => { dispatch(actions.makeTrainer(trainerForm.name));document.getElementById('name').value ='';}

  return (
    <div>
      <label>
        Name:
        <input onChange={(e) => setting(e)} id="name" name="name"/>
      </label>
      <button onClick={makeTrainer}>Make New Trainer</button>
    </div>
  );
}

export default MakeTrainer;