import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NoteService } from './../shared/note.service';
import { LocationPickerComponent } from '../shared/pickers/location-picker/location-picker.component';
import { PlaceLocation } from 'src/models/location.model';

@Component({
  selector: 'app-make-note',
  templateUrl: './make-note.page.html',
  styleUrls: ['./make-note.page.scss'],
})
export class MakeNotePage implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private aptService: NoteService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      title: [''],
      content: [''],
      date: new Date(),
      location: null,
    })
  }
  //
  onLocationPicked(location: PlaceLocation) {
    this.bookingForm.patchValue({ location: location });
  }
  //
  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

}
