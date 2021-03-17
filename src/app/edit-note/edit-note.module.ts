import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNotePageRoutingModule } from './edit-note-routing.module';

import { EditNotePage } from './edit-note.page'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNotePageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [EditNotePage]
})
export class EditNotePageModule {}
