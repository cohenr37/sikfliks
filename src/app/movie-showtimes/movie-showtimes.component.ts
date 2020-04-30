import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute,Params, Router} from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-movie-showtimes',
  templateUrl: './movie-showtimes.component.html',
  styleUrls: ['./movie-showtimes.component.scss']
})
export class MovieShowtimesComponent {
  state$ = this.backendService.currentState;

  constructor(private route:ActivatedRoute,
              private backendService: BackendService,
              private router: Router) { }

}