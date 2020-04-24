import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { userFormComponent } from './userForm/userForm.component';
import { NbspPipe } from './nbsp.pipe';
import { IsSubmittedGuard } from './is-submitted.guard';
import { MovieTablesComponent } from './movie-tables/movie-tables.component';
import { TheaterTablesComponent } from './theater-tables/theater-tables.component';


@NgModule({
  declarations: [
    AppComponent,
    userFormComponent,
    MovieTablesComponent,
    TheaterTablesComponent,
    NbspPipe
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
