import React, { MouseEvent } from 'react'
import './VehicleList.scss';
import VehicleListItem from '../VehicleListItem';
import { IVehicle, IFilmDetails } from '../../types';

interface VehicleListProps {
  vehicles: IVehicle[],
  handleFilmDetails: (event: MouseEvent, film: IFilmDetails) => void
  handleNextPage: (e: MouseEvent) => void
  handlePreviousPage: (e: MouseEvent) => void
}

const VehiclesList: React.FC<VehicleListProps> = (props) => {
  const {
    vehicles, 
    handleFilmDetails, 
    handleNextPage, 
    handlePreviousPage,
  } = props;
  
  return (
    <div className="vehicles-list-container">
      <header className="vehicle-list-header">
        <h3 className="vehicle-list-title">Vehicle List</h3>
      </header>
        <ul className="vehicle-list">
        {vehicles?.map((vehicle, idx) => {
          return (
            <VehicleListItem handleFilmDetails={handleFilmDetails} key={idx+1} vehicle={vehicle}/>
          )
        })}
      </ul>
      <footer className="vehicle-list-footer">
        <div className="button-container">
          <button className="previous-button" onClick={(e) => handlePreviousPage(e)}>Previous</button>
          <button className="next-button" onClick={(e) => handleNextPage(e)}>Next</button>
        </div>
      </footer>
    </div>
  )
}

export default VehiclesList