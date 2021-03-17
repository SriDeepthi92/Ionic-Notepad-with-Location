import { Injectable } from '@angular/core';
import { Notes } from '../shared/note';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {PlaceLocation} from '../../models/location.model'
@Injectable({
  providedIn: 'root'
})

export class NoteService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createBooking(apt: Notes) {
    return this.bookingListRef.push({
      title: apt.title,
      content: apt.content,
      date: new Date(),
      location: apt.location,
    })
  }

  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/note/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/note');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, apt: Notes) {
    return this.bookingRef.update({
      title: apt.title,
      content: apt.content,
      date: new Date(),
      location: apt.location,

    })
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/note/' + id);
    this.bookingRef.remove();
  }
}
