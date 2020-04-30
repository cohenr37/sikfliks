import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-movie-showtimes',
  templateUrl: './movie-showtimes.component.html',
  styleUrls: ['./movie-showtimes.component.scss']
})
export class MovieShowtimesComponent {
  state$ = this.backendService.currentState;

  constructor(private backendService: BackendService) { }

}
