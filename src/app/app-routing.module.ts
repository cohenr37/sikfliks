import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheaterTablesComponent } from './theater-tables/theater-tables.component';
import { MovieTablesComponent } from './movie-tables/movie-tables.component';

const routes: Routes = [
  {path: 'movies', component: MovieTablesComponent},
  {path: 'theaters', component: TheaterTablesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};
export const routingComponents = [MovieTablesComponent, TheaterTablesComponent];
