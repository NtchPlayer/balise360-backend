import { CreateTripsDto } from './';

export interface CreateTrailsDto {
  name: string;
  geojson: string;
  trips: Array<CreateTripsDto>;
}
