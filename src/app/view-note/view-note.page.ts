import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/models/note.model';
import { AddNotePage } from '../add-note/add-note.page';
import { NoteServiceService } from '../note-service.service';
import { PlaceLocation } from 'src/models/location.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationPickerComponent } from '../shared/pickers/location-picker/location-picker.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  public note: Note;

  constructor(private route: ActivatedRoute, private notesService: NoteServiceService, private navCtrl: NavController) {
    this.note = {
      id: '',
      title: '',
      content: '',
      date: new Date(),
      location: '',
    };
   }

  ngOnInit() {
    let noteId = this.route.snapshot.paramMap.get('id');

  if(this.notesService.loaded){
      this.note = this.notesService.getNote(noteId)
    } else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteId)
      });
    }

  }

  noteChanged(){
    this.notesService.save();
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    this.navCtrl.navigateBack('/home');
  }

}
