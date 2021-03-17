import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController} from '@ionic/angular';
import { Note } from 'src/models/note.model';
import { NoteServiceService } from '../note-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular'

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage {
  place:string="";
  type:string="";
  icon:string="";
  temperature="";

  constructor( public httpClient:HttpClient,
    public geolocation:Geolocation,
    public platform: Platform ) {
      this.platform.ready().then(()=> {
        this.GetCurrentLocation();
      }

      )
     }

   GetCurrentLocation()
   {
    this.geolocation.getCurrentPosition().then((position)=>
    {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.GetCurrentTemperature(latitude,longitude)
    })
   }


   GetCurrentTemperature(latitude,longitude){

    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=46682fec96f1e0f74082470e5205dd3e";
    this.httpClient.get(url).subscribe((temperaturedata)=>{
      var obj = <any>temperaturedata;
      this.place = obj.name;
      this.type = obj.weather[0].main;
      this.icon = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
      this.temperature = ((parseFloat(obj.main.temp)-273.15).toFixed(2)).toString()+"°C";
    })
   }
  ngOnInit(){
  }





}
