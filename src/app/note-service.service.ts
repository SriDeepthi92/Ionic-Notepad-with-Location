import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { Note } from 'src/models/note.model';
import { AuthService } from './auth/auth.service';
//import { BehaviorSubject } from 'rxjs';
import { PlaceLocation } from '../models/location.model';
import { LocationPickerComponent} from '../app/shared/pickers/location-picker/location-picker.component'

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  public place: PlaceLocation;
  public notes: Note[]=[];
  public loaded: boolean = false;
  private address : 'LocationPickerComponent["generateAddress"]';

  constructor(public storage: Storage, private http: HttpClient ) { }

  load(): Promise<boolean>{
    return new Promise((resolve) => {
      this.storage.get('notes').then((notes) => {
        if(notes != null){
          this.notes = notes;
        }
          this.loaded = true;
        resolve(true);

      });

    });

  }

  save(): void {
    // Save the current array of notes to storage

    this.storage.set('notes', this.notes);
  }
  getNote(id): Note {
    // Return the note that has an id matching the id passed in
    return this.notes.find(note => note.id === id);

  }
  createNote(title): void {

    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;

    this.notes.push({
      id: id.toString(),
      title: title,
      content: '',
      date: new Date(),
      location: '',


    });
    this.save();

  }

  deleteNote(note): void {

    // Get the index in the array of the note that was passed in
    let index = this.notes.indexOf(note);

    // Delete that element of the array and resave the data
    if(index > -1){
      this.notes.splice(index, 1);
      this.save();
    }

  }




}

