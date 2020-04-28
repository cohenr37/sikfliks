import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheaterTablesComponent } from './theater-tables/theater-tables.component';
import { MovieTablesComponent } from './movie-tables/movie-tables.component';
import { userFormComponent } from './userForm/userForm.component';
import { IsSubmittedGuard } from './is-submitted.guard';

const routes: Routes = [
  {path: '', component: userFormComponent},
  {path: 'movies', component: MovieTablesComponent, canActivate: [IsSubmittedGuard] },
  {path: 'theaters', component: TheaterTablesComponent, canActivate: [IsSubmittedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsSubmittedGuard]
})
export class AppRoutingModule {};
