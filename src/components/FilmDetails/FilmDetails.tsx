import React, { useContext } from "react"
import { VehiclesContextType } from "../../types";
import './FilmDetails.scss';
import { VehiclesContext } from "../../context/VehiclesContext";

const FilmDetails: React.FC = () => {
  const {film} = useContext(VehiclesContext) as VehiclesContextType;

  return (
    <div className="film-details-container">
      {film.title && (
        <>
        <h1 className="film-details-header">{film.title}</h1>
        <div className="film-details">
          <p className="director">Director: {film.director}</p>
          <p className="producer">Producer: {film.producer}</p>
          <p className="producer">Release Date: {film.release_date}</p>
          <p className="producer">Opening Crawl: {film.opening_crawl}</p>
        </div>
        </>
        )
      }
      
    </div>
  )
}

export default FilmDetails;