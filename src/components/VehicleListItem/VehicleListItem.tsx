import React, { useContext } from 'react';
import './VehicleListItem.scss';
import {IVehicle, IFilmDetails, VehiclesContextType} from '../../types';
import { VehiclesContext } from '../../context/VehiclesContext';

interface IVehicleListItemProps {
  vehicle: IVehicle;
}

const VehicleListItem: React.FC<IVehicleListItemProps> = ({vehicle}) => {
  const {handleFilmDetails} = useContext(VehiclesContext) as VehiclesContextType;

  const renderFilmList = vehicle.films.map((film: IFilmDetails) => {
    return <li key={film.episode_id} onClick={(e) => handleFilmDetails(e, film)}>{film.title}</li>
  })

  return (
    <li className="vehicle">
      <div className="vehicle-details-container">
        <p className="vehicle-name">Name: {vehicle.name}</p>
        <p className="vehicle-model">Model: {vehicle.model}</p>
        <p className="vehicle-manufacturer">Manufacturer: {vehicle.manufacturer}</p>
      </div>
      <div className="films-container">
        <span className="title">Films</span>
        <ul className="film-list">{renderFilmList}</ul>
      </div>
        
    </li>
  )
}

export default VehicleListItem;