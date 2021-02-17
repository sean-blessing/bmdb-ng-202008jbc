import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  title = "Movie Detail";
  movie: Movie = null;
  movieId: number = 0;
  msg: string = "";

  constructor(private movieSvc: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get the id from the url
    this.route.params.subscribe(
      parms => {this.movieId = parms['id'];
     }
    );
    //get movie by id
    this.movieSvc.getById(this.movieId).subscribe(
      resp => {
        this.movie = resp as Movie;
      },
      err => {
        console.log(err);
        this.msg = "Error getting movie for id: "+this.movieId;
      }
    );
  }
  delete() {
    this.msg = "";
    // save the movie to the DB
    this.movieSvc.delete(this.movie.id).subscribe(
      resp => {
        this.movie = resp as Movie;
        // forward to the movie list component
        this.router.navigateByUrl("/movie-list");
      },
      err => {
        console.log(err);
        this.msg = "Server Error - DELETE movie for id: "+this.movieId;
      }

    );
  }
}
