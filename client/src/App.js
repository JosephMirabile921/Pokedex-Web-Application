import React from 'react';
import './App.css';
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import Trainers from "./components/Trainers";
import Home from './components/Home';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1>
            Pokedex
          </h1>
          <Link to='/'>
            Home
          </Link>
          <Link to='/pokemon/page/0'>
            Pokemon
          </Link>
          <Link to='/trainers'>
            Trainers
          </Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/page/:pagenum' element={<CharacterList />} />
            <Route path='/pokemon/:id' element={<Character />} />
            <Route path='/trainers' element={<Trainers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;