import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MakeTrainer from './MakeTrainer';
import Trainer from './Trainer';


const Trainers = () => {
    const [toggle, setToggle] = useState(false);
    const myTrainers = useSelector((state) => state.trainers);

    return (
        <div>
        <h2>Trainers</h2>
        <button onClick={() => {setToggle(!toggle);} }>New Trainer</button>
        <br />
        {toggle && <MakeTrainer />}
        <br />
        {myTrainers && myTrainers.map((trainer) => { return <Trainer key={trainer.id} trainer={trainer} />})}
        </div>
    )
}

export default Trainers;
