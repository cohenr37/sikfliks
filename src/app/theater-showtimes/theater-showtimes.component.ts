import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-theater-showtimes',
  templateUrl: './theater-showtimes.component.html',
  styleUrls: ['./theater-showtimes.component.scss']
})
export class TheaterShowtimesComponent {
  state$ = this.backendService.currentState;

  constructor(private backendService: BackendService) { }
}
