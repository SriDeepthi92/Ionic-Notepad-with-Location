import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NoteServiceService } from './note-service.service';
import { LocationPickerComponent } from './shared/pickers/location-picker/location-picker.component';
import { MapModalComponent } from './shared/map-modal/map-modal.component';
import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';

// import firebase + enviornment

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [AppComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
     IonicModule.forRoot(),
     AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},NoteServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
