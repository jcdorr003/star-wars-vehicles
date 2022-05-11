import React, { useContext } from 'react';
import { VehiclesContext } from '../../context/VehiclesContext';
import { VehiclesContextType } from '../../types';
import './Dropdown.scss';

const Dropdown: React.FC = () => {
  const {handleDropdownSelect} = useContext(VehiclesContext) as VehiclesContextType;
  return (
    <div className="filter-container">
      <div className='filter-description'>Filter</div>
      <div>
        <select
          name="film-list"
          id="film-list"
          onChange={handleDropdownSelect}
        >
          <option value="">All</option>
          <option value="A New Hope">A New Hope</option>
          <option value="The Empire Strikes Back">The Empire Strikes Back</option>
          <option value="Return of the Jedi">Return of the Jedi</option>
          <option value="The Phantom Menace">The Phantom Menace</option>
          <option value="Attack of the Clones">Attack of the Clones</option>
          <option value="Revenge of the Sith">Revenge of the Sith</option>
        </select>
      </div>
    </div>
  )
}

export default Dropdown;