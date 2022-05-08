import './App.scss';
import VehiclesList from './components/VehiclesList';
import FilmDetails from './components/FilmDetails';

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="header">Star Wars Vehicles</span>
      <div className="content-wrapper">
        <VehiclesList/>
        <FilmDetails/>
      </div>
    </div>
  );
}

export default App;
