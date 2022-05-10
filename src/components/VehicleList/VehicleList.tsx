import React, { MouseEvent } from 'react'
import './VehicleList.scss';
import VehicleListItem from '../VehicleListItem';
import { IVehicle, IFilmDetails } from '../../types/VehicleType';

interface VehicleListProps {
  vehicles: IVehicle[],
  handleFilmDetails: (event: MouseEvent, film: IFilmDetails) => void
}

const VehiclesList: React.FC<VehicleListProps> = ({vehicles, handleFilmDetails}) => {
  
  return (
    <div className="vehicles-list-container">
      <ul className="vehicle-list">
        {vehicles?.map((vehicle, idx) => {
          return (
            <VehicleListItem handleFilmDetails={handleFilmDetails} key={idx+1} vehicle={vehicle}/>
          )
        })}
      </ul>
    </div>
  )
}

export default VehiclesList