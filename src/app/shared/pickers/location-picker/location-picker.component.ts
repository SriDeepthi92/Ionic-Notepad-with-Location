import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { environment } from '../../../../environments/environment';
import { Storage } from '@ionic/storage';
import { PlaceLocation} from '../../../../models/location.model'
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  private storage: Storage;
  // Readable Address
  address: string;
  // Location coordinates
  latitude: number;
  longitude: number;
  @Output()locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading = false;
  constructor(private geolocation: Geolocation, private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;



    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  onPickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(
          address => {
            this.address = this.generateAddress(address);
          }

        );
        const pickedLocation: PlaceLocation = {
          lat: modalData.data.lat,
          lng: modalData.data.lng,
          address: null,
          staticMapImageUrl: null
        };
        this.isLoading = true;
        this.getAddress(modalData.data.lat, modalData.data.lng)
          .pipe(
            switchMap(address => {
              pickedLocation.address = address;
              return of(
                this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
              );
            })
          )
          .subscribe(staticMapImageUrl => {
            pickedLocation.staticMapImageUrl = staticMapImageUrl;
            this.selectedLocationImage = staticMapImageUrl;
            this.isLoading = false;
            this.locationPick.emit(pickedLocation);
          });
      });
      modalEl.present();
    });
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          environment.googleMapsAPIKey
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    //obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val];
    }
    return address.slice(0, -2);
  }

  getValue(key: string) {
    this.storage.get(key).then((val) => {
      console.log('get ' + key + ' ', val);
      this.address[key] = "";
      this.address[key] = val;
    }).catch((error) => {
      console.log('get error for ' + key + '', error);
    });
}

private getMapImage(lat: number, lng: number, zoom: number) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
  &markers=color:red%7Clabel:Place%7C${lat},${lng}
  &key=${environment.googleMapsAPIKey}`;
}
}
