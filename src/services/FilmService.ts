import swapi from "../swapiService";

export const getAllFilms = () => {
  return swapi.get('/films');
}






