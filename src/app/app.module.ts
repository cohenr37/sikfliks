import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { userFormComponent } from './userForm/userForm.component';
import { NbspPipe } from './nbsp.pipe';
import { TheaterTablesComponent } from './theater-tables/theater-tables.component';
import { MovieTablesComponent } from './movie-tables/movie-tables.component';

@NgModule({
  declarations: [
    AppComponent,
    userFormComponent,
    NbspPipe,
    TheaterTablesComponent,
    MovieTablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
