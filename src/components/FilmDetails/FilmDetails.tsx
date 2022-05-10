import React from "react"
import { IFilmDetails } from "../../types/VehicleType";
import './FilmDetails.scss';

interface FilmDetailsProps {
  film: IFilmDetails
}

const FilmDetails: React.FC<FilmDetailsProps> = ({film}) => {
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