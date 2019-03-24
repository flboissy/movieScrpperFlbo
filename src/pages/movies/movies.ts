import { MovieDetailPage } from './../movie-detail/movie-detail';
import { IMovie } from './../../interfaces/IMovie';
import { PostersProvider } from './../../providers/posters/posters';
import { MoviesProvider } from './../../providers/movies/movies';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IMedia } from '../../interfaces/IMedia';
import { Page } from 'ionic-angular/navigation/nav-util';
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  public movies: Array<IMedia>;
  public currentPage = 1;
  public currentSearchString : string = "";
  public detailPage = MovieDetailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private moviesProvider: MoviesProvider, private postersProvider: PostersProvider) {
  }

  ionViewDidLoad() {
  }


  loadData(infiniteScroll) {
    setTimeout(() => {
      this.currentPage++;
      this.moviesProvider.searchMovieByName(this.currentSearchString, this.currentPage)
        .then(results => {
          this.movies = this.movies.concat(results);
          this.movies.forEach(movie => {
            movie.Poster = "http://img.omdbapi.com/?apikey=75522b56&h=9000&i=" + movie.imdbID;
          });

        });
      infiniteScroll.complete();
    }, 500);
  }

  onSearchChanged(search : string){
    console.log("yolo");
    this.currentSearchString = search;
  }

  onMediasChanged(medias : Array<IMedia>){
    console.log("yola");
    this.movies = medias;
  }

}
