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

  /**
   * On mount setIsLoading is set to true to trigger the loading state.
   * Then getVehiclesAndFilms is called witch handles the api call and building the new vehicle object
   */
  useEffect(() => {
    setIsLoading(true);
    getVehiclesAndFilms();
  }, [])

  /**
   * @param params optional params to pass in when calling the api to get next/previous pages
   * 
   * This function is a bit complicated but I wanted to try and limit the amount of api calls
   * by calling all vehicles and all films once and then creating a new vehicle shape that has just the data I need
   * including the film data associated with instead of just the film URLs. There is some more refactoring 
   * that I know could be done but this was the solution I came up with for now. 
   */
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
   .catch(err => {
     console.log('error :>> ', err);
    /**
     * error would be set in state here to 
     * trigger an error state for the UI
     */
   });
  }

  const getFilmDetails = (filmURL: string, films: IFilmDetails[]) => {
    const film = films.find((film: IFilmDetails) => film.url === filmURL);
    return film ? film : null;
  }

  const handleNextPage = (e: MouseEvent) => {
    e.preventDefault();
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

  const handleDropdownSelect = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setFilterCategory(event.target.value);
 }

 // Filter functionality still in work
  const getFilteredList = () => {
    if (filterCategory === '') {
      return vehicles;
    }

      // Filter logic here
    
      
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
        handleDropdownSelect
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};
