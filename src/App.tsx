import React from 'react';
import './App.scss';
import VehicleList from './components/VehicleList';
import FilmDetails from './components/FilmDetails';
import { VehiclesProvider } from './context/VehiclesContext';

const App: React.FC = () => {
  
  return (
    <VehiclesProvider>
      <div className="App">
        <div className="header">
          <h1 className="title">Star Wars Vehicles</h1>
        </div>
        <div className="content-wrapper">
          <VehicleList/>
          <FilmDetails/>
        </div>
      </div>
      </VehiclesProvider>
    
  );
}

export default App;
