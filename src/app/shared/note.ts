import { PlaceLocation } from "src/models/location.model";

export class Notes {
  $key: string;
  title: string;
  content: string
  date: Date;
  location: PlaceLocation;
}
