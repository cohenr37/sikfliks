import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-theater-showtimes',
  templateUrl: './theater-showtimes.component.html',
  styleUrls: ['./theater-showtimes.component.scss']
})
export class TheaterShowtimesComponent {
  public state$ = this.backendService.currentState;
  public theaterName: string;

  constructor(private backendService: BackendService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.theaterName = this.activatedRoute.snapshot.params['theaterName'];
  }
}
