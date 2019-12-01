import React from 'react';
import logo from './logo.svg';
import './App.css';

// import {Button} from '@material-ui/core';
import Axios from 'axios';
import Bokeh from 'bokehjs';


function handlePlot1 () {
  Axios.get("http://localhost:5000/plot1").then(resp => Bokeh.embed.embed_item(resp.data, 'testPlot'))
}

function handlePlot2 () {
  Axios.get("http://localhost:5000/plot2").then(resp => window.testPlot2 = Bokeh.embed.embed_item(resp.data, 'testPlot'))
}

function App() {
  return (
    <div className="App" style={{margin: 20}}>
      Hello World
      <button variant="contained" style={{margin: 10}} color="primary" onClick={handlePlot1}>
        Get Plot 1
      </button>
      <button variant="contained" style={{margin: 10}} color="primary" onClick={handlePlot2}>
        Get Plot 2
      </button>
      <div id='testPlot' className="bk-root"></div>
    </div>
  );
}

export default App;
