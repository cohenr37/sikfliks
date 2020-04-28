import { Component, OnInit, Input, Directive, HostListener } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public response:any;

  constructor(private router: Router) { }

  ngOnInit() {}
}
