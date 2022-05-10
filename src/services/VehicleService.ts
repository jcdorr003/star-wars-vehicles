import swapi from '../swapiService';
import { IVehicle } from '../types/VehicleType';

export const getAllVehicles = (params?: string) => {
  return params ? swapi.get<IVehicle[]>(`/vehicles/${params}`) : swapi.get<IVehicle[]>(`/vehicles`)
}


