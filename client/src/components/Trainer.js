import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';
import Team from './Team';

const Trainer = (props) => {
    const dispatch = useDispatch();
    const selectTrainer = () => {dispatch(actions.selectTrainer(props.trainer.id));}
    const unselectTrainer = () => {dispatch(actions.unselectTrainer(props.trainer.id));}
    const deleteTrainer = () => {dispatch(actions.deleteTrainer(props.trainer.id));}
    console.log(props)
    return (
        <div>
        <table>
            <tbody>
            <tr>
                <th>Trainer:</th>
                <th>{props.trainer.name}</th>
            </tr>
            <tr>
                <th>Team:</th>
                <Team trainer={props.trainer}/>
            </tr>
            <tr>
                <th>
                {!props.trainer.select && <button onClick={deleteTrainer}>Delete Trainer</button>}
                {props.trainer.select ? <button onClick={unselectTrainer}>Selected Trainer</button> 
                : <button onClick={selectTrainer}>Select Trainer</button>}
                </th>
            </tr>
            </tbody>
        </table>
        </div>
    )
}
export default Trainer