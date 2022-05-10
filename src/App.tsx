import React, {useState, useEffect, MouseEvent} from 'react';
import './App.scss';
import VehicleList from './components/VehicleList';
import FilmDetails from './components/FilmDetails';
import { IFilmDetails, IVehicle } from './types/VehicleType';
import { getAllVehicles } from './services/VehicleService';
import {AxiosResponse} from 'axios';
import { getAllFilms } from './services/FilmService';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [filmDetails, setFilmDetails] = useState<IFilmDetails>(Object);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    getVehiclesAndFilms();
  }, [])

  const getVehiclesAndFilms = (params?: string) => {
    Promise.all([getAllVehicles(params), getAllFilms()])
   .then(([vehiclesResp, filmsResp]: AxiosResponse[]) => {
     setNextPage(vehiclesResp.data.next)
     setPrevPage(vehiclesResp.data.previous);
     const vehicles = vehiclesResp.data.results;
     const films = filmsResp.data.results;
     return vehicles.map((vehicle: IVehicle) => {
       const filmObjects = vehicle.films.map((filmURL: string) => {
        return getFilmDetails(filmURL, films);
       });
       
       const newVehicleObject = {
         name: vehicle.name,
         manufacturer: vehicle.manufacturer,
         model: vehicle.model,
         films: filmObjects
       }
       return newVehicleObject;
       
       
     })
     
    
   })
   .then(vehiclesWithFilmData => {
     setVehicles(vehiclesWithFilmData);
   })
  }

  const handleNextPage = (e: MouseEvent) => {
    e.preventDefault();
    console.log('clicked next')
    console.log('nextPage :>> ', nextPage);
    if (nextPage) {
      const splitURL = nextPage?.split('/');
      const params = splitURL[splitURL.length - 1];
      getVehiclesAndFilms(params);
    }

  }

  const handlePreviousPage = (e: MouseEvent) => {
    e.preventDefault();
    console.log('clicked previous');
    console.log('prevPage :>> ', prevPage);
    if (prevPage) {
      const splitURL = prevPage?.split('/');
      const params = splitURL[splitURL.length - 1];
      getVehiclesAndFilms(params);
    }
  }

  const getFilmDetails = (filmURL: string, films: IFilmDetails[]) => {
    const film = films.find((film: IFilmDetails) => film.url === filmURL);
    return film ? film : null;
  }

  const handleFilmDetails = (event: MouseEvent, film: IFilmDetails) => {
    event.preventDefault();
    setFilmDetails(film)
  }

  return (
      <div className="App">
        <div className="header">
          <h1 className="title">Star Wars Vehicles</h1>
        </div>
        <div className="content-wrapper">
          <VehicleList vehicles={vehicles} handleFilmDetails={handleFilmDetails}/>
          <FilmDetails film={filmDetails}/>
        </div>
        <Footer handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage}/>
      </div>
    
  );
}

export default App;
