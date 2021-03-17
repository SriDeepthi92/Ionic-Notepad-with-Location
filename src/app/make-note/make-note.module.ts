import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MakeNotePageRoutingModule } from './make-note-routing.module';

import { MakeNotePage } from './make-note.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MakeNotePageRoutingModule,
    SharedModule
  ],
  declarations: [MakeNotePage]
})
export class MakeNotePageModule {}
