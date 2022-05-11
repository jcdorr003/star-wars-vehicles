import React, {useContext} from 'react'
import './VehicleList.scss';
import VehicleListItem from '../VehicleListItem';
import { VehiclesContextType } from '../../types';
import Dropdown from '../Dropdown';
import { VehiclesContext } from '../../context/VehiclesContext';

const VehiclesList: React.FC = () => {
  const {vehicles, filteredList, handlePreviousPage, handleNextPage} = useContext(VehiclesContext) as VehiclesContextType;
  console.log('filteredList :>> ', filteredList);
  return (
    <div className="vehicles-list-container">
      <header className="vehicle-list-header">
        <h3 className="vehicle-list-title">Vehicle List</h3>
        <Dropdown/>
      </header>
        <ul className="vehicle-list">
        {vehicles?.map((vehicle, idx) => {
          return (
            <VehicleListItem key={idx+1} vehicle={vehicle}/>
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