import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieForm } from '../movieForm';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.scss']
})

export class userFormComponent implements OnInit {

  model = { movie: "Batman", lat: 51.678418, lon: 7.809007, radius: 10 };
  response = null;
  submitted = false;
  hasLocation = false;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.geoFindMe().then((location: any) => {
      this.model.lat = location.lat;
      this.model.lon = location.lon;
    }).then(() => this.hasLocation = true)
  }

  request() {
    this.submitted = true;

    this.backendService.postUserForm(this.model).subscribe((res) => {
      this.response = res;
      console.log(this.response);
    });

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
