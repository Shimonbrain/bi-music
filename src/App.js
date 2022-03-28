import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import Home from './components/home/Home';
import Player from './components/player/Player';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("./songs.json")
      .then((res) => res.json())
      .then( result => dispatch({
        type: "GET_PLAYLIST",
        result,
      }));
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;
