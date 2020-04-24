import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieForm } from '../movieForm';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.scss']
})

export class userFormComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter<{movie: string, lat: number, lon: number, radius: number}>();
  model = { movie: "Batman", lat: 51.678418, lon: 7.809007, radius: 10 };
  hasLocation = false;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.geoFindMe().then((location: any) => {
      this.model.lat = location.lat;
      this.model.lon = location.lon;
    }).then(() => this.hasLocation = true)
  }

  postForm() {
    this.backendService.postUserForm({movie: this.model.movie, lat: this.model.lat, lon: this.model.lon, radius: this.model.radius});
  }

  geoFindMe() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        }, () => {
          reject('Unable to retrieve your location');
        });
      }
    });
  }
}
