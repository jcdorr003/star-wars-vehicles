import React, { MouseEvent } from 'react';
import './VehicleListItem.scss';
import {IVehicle, IFilmDetails} from '../../types';

interface IVehicleListItemProps {
  vehicle: IVehicle;
  handleFilmDetails: (event: MouseEvent, film: IFilmDetails) => void;
}

const VehicleListItem: React.FC<IVehicleListItemProps> = ({vehicle, handleFilmDetails}) => {
  
  const renderTitleList = vehicle.films.map((film: IFilmDetails) => {
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
        <ul className="film-list">{renderTitleList}</ul>
      </div>
        
    </li>
  )
}

export default VehicleListItem;