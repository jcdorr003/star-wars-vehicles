import React, {useContext} from 'react'
import './VehicleList.scss';
import VehicleListItem from '../VehicleListItem';
import { VehiclesContextType } from '../../types';
import Dropdown from '../Dropdown';
import { VehiclesContext } from '../../context/VehiclesContext';
import LoadingState from '../LoadingState';

const VehiclesList: React.FC = () => {
  const {isLoading, filteredVehicles, handlePreviousPage, handleNextPage, prevPage, nextPage} = useContext(VehiclesContext) as VehiclesContextType;
  
  return (
    <div className="vehicles-list-container">
      <header className="vehicle-list-header">
        <h3 className="vehicle-list-title">Vehicle List</h3>
        <Dropdown/>
      </header>
      {isLoading ?
        <LoadingState/> :
        <ul className="vehicle-list">
          {filteredVehicles?.map((vehicle, idx) => {
            return (
              <VehicleListItem key={idx} vehicle={vehicle}/>
            )
          })}
        </ul>
      }
      <footer className="vehicle-list-footer">
        <div className="button-container">
          {prevPage && <button className="previous-button" onClick={(e) => handlePreviousPage(e)}>Previous</button>}
          {nextPage && <button className="next-button" onClick={(e) => handleNextPage(e)}>Next</button>}
        </div>
      </footer>
    </div>
  )
}

export default VehiclesList