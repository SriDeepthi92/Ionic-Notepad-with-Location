import { PlaceLocation } from "./location.model";
import { LocationPickerComponent} from "../app/shared/pickers/location-picker/location-picker.component";

export interface Note {
  id:string;
  title: string
  content: string
  date: Date
  //createDate: number
  location : string



}
