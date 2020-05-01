import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-movie-showtimes',
  templateUrl: './movie-showtimes.component.html',
  styleUrls: ['./movie-showtimes.component.scss']
})
export class MovieShowtimesComponent {
  public state$ = this.backendService.currentState;
  public movieTitle: string;

  constructor(private backendService: BackendService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(){
    this.movieTitle = this.activatedRoute.snapshot.params['movieTitle'];

  }

}
