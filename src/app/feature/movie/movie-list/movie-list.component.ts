import { SystemService } from './../../../service/system.service';
import { MovieService } from './../../../service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.class';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  title = "Movie List";
  movies: Movie[] = [];
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";

  constructor(private movieSvc: MovieService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    // if coming from login we should have an authenticated user inside sysSvc
    console.log('movie list - loggedInUser?',this.sysSvc.loggedInUser);
    // populate the list of movies
    this.movieSvc.getAll().subscribe(
      resp => {
        this.movies = resp as Movie[];
        console.log('Movies',this.movies);
      },
      err => {
        console.log(err);
      }
    );
  }

  sortBy(column: string): void {
    console.log("movie list sortBy called")
    if(column == this.sortCriteria){
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }

}
