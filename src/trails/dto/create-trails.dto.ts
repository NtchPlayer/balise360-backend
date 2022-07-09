import { CreateTripsDto } from '../../trips/dto';

export interface CreateTrailsDto {
  name: string;
  geojson: string;
  trips: Array<CreateTripsDto>;
}
