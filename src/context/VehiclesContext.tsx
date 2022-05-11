import React, { useState, createContext, useEffect, useMemo, MouseEvent} from 'react';
import {VehiclesContextType, IVehicle, IFilmDetails} from '../types';
import {getAllVehicles} from '../services/VehicleService';
import {getAllFilms} from '../services/FilmService';
import {AxiosResponse} from 'axios';

interface IVehicleProviderProps{ 
  children: React.ReactNode;
}

export const VehiclesContext = createContext<VehiclesContextType | null>(null);

export const VehiclesProvider: React.FC<IVehicleProviderProps> = ({ children }) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [film, setFilm] = useState<IFilmDetails>(Object);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)



  useEffect(() => {
    setIsLoading(true);
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
     setIsLoading(false);
   })
  }

  const getFilmDetails = (filmURL: string, films: IFilmDetails[]) => {
    const film = films.find((film: IFilmDetails) => film.url === filmURL);
    return film ? film : null;
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
    if (prevPage) {
      const splitURL = prevPage?.split('/');
      const params = splitURL[splitURL.length - 1];
      getVehiclesAndFilms(params);
    }
  }

  const handleFilmDetails = (event: MouseEvent, film: IFilmDetails) => {
    event.preventDefault();
    setFilm(film)
  }

  const handleCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log('event :>> ', event.target.value);
    setFilterCategory(event.target.value);
 }

 // Filter functionality still in work
  const getFilteredList = () => {
    if (filterCategory === '') {
      return vehicles;
    }

    vehicles.filter((vehicle: IVehicle) => {
      return vehicle.films.filter((film: IFilmDetails) => {
        if (film.title === filterCategory) {
          console.log('vehicle :>> ', vehicle);
          return vehicle;
        }

      })
    })

      
  }

const filteredList = useMemo(getFilteredList, [filterCategory, vehicles]);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        filteredList,
        film,
        isLoading,
        handleNextPage,
        handlePreviousPage,
        handleFilmDetails,
        handleCategoryChange
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};
