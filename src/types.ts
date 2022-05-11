import { MouseEvent } from "react"
export interface IVehicle {
  cargo_capacity?: string,
  consumables?: string,
  cost_in_credits?: string,
  created: string,
  crew?: string,
  edited?: string,
  films: [],
  length?: string,
  manufacturer: string,
  max_atmosphering_speed?: string,
  model: string,
  name: string,
  passengers?: string,
  pilots?: string[],
  url?: string,
  vehicle_class?: string
}

export interface IFilmDetails {
  characters: string[],
  created: string,
  director: string,
  edited: string,
  episode_id: number,
  opening_crawl: string,
  planets: string[],
  producer: string,
  release_date: string,
  species: string[],
  starships: string[],
  title: string,
  url: string,
  vehicles: string[]
}

export type VehiclesContextType = {
  vehicles: IVehicle[],
  filteredList?: IVehicle[],
  film: IFilmDetails
  isLoading: boolean
  handleNextPage: (e: MouseEvent) => void
  handlePreviousPage: (e: MouseEvent) => void
  handleFilmDetails: (event: MouseEvent, film: IFilmDetails) => void
  handleCategoryChange: (event: { target: { value: React.SetStateAction<string>; }; }) => void
}

