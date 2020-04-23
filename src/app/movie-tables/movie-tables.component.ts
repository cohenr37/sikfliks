import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-tables',
  templateUrl: './movie-tables.component.html',
  styleUrls: ['./movie-tables.component.scss']
})
export class MovieTablesComponent implements OnInit {

  @Input() response;

  constructor() { }

  ngOnInit() {
  }

}
