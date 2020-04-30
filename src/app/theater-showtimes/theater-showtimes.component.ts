import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute,Params, Router} from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-theater-showtimes',
  templateUrl: './theater-showtimes.component.html',
  styleUrls: ['./theater-showtimes.component.scss']
})
export class TheaterShowtimesComponent {
  state$ = this.backendService.currentState;

  constructor(private route:ActivatedRoute,
              private backendService: BackendService,
              private router: Router) { }

}