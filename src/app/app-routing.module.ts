import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheaterTablesComponent } from './theater-tables/theater-tables.component';
import { MovieTablesComponent } from './movie-tables/movie-tables.component';
import { MovieShowtimesComponent } from './movie-showtimes/movie-showtimes.component';
import { TheaterShowtimesComponent } from './theater-showtimes/theater-showtimes.component';
import { userFormComponent } from './userForm/userForm.component';
import { IsSubmittedGuard } from './is-submitted.guard';

const routes: Routes = [
  {path: '', component: userFormComponent},
  {path: 'movies', component: MovieTablesComponent, canActivate: [IsSubmittedGuard] },
  {path: 'theaters', component: TheaterTablesComponent, canActivate: [IsSubmittedGuard] },
  {path: 'm-showtimes', component: MovieShowtimesComponent, canActivate: [IsSubmittedGuard] },
  {path: 't-showtimes', component: TheaterShowtimesComponent, canActivate: [IsSubmittedGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsSubmittedGuard]
})
export class AppRoutingModule {};
