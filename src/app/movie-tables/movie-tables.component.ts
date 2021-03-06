import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-movie-tables',
  templateUrl: './movie-tables.component.html',
  styleUrls: ['./movie-tables.component.scss']
})
export class MovieTablesComponent {
  state$ = this.backendService.currentState;

  constructor(private route:ActivatedRoute,
              private backendService: BackendService,
              private router: Router) { }

}
