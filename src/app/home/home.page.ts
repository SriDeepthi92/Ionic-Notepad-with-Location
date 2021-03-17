import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,NavController } from '@ionic/angular';
import { Note } from 'src/models/note.model';
import { AddNotePage } from '../add-note/add-note.page';
import { NoteServiceService } from '../note-service.service';
import {Notes} from '../shared/note';
import { NoteService } from './../shared/note.service';
import { ActivatedRoute } from '@angular/router';

import { PlaceLocation } from 'src/models/location.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationPickerComponent } from '../shared/pickers/location-picker/location-picker.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Promise<Note[]>;
  Bookings = [];

  constructor(public navCtrl: NavController,  private aptService: NoteService,
    private router: Router, public notesService: NoteServiceService, private alertCtrl: AlertController) {}

  ngOnInit(){
    this.notesService.load();
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Notes);
      })
    })
  }

  addNote(){

    this.alertCtrl.create({
      header: 'New text',
      message: 'What should the title of this page be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.notesService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteBooking(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }
  }
}
