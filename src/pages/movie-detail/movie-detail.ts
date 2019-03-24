import { FavoriteProvider } from './../../providers/favorite/favorite';
import { IMovie } from './../../interfaces/IMovie';
import { MoviesProvider } from './../../providers/movies/movies';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  public media: IMovie;
  public added: boolean;
  private movieID: string;

  ionViewWillEnter() {
    console.log("coucou");
    this.moviesProvider.getMovieById(this.movieID)
      .then((movieResult) => {
        if (movieResult) {
          this.media = movieResult;
          this.media.Poster = "http://img.omdbapi.com/?apikey=75522b56&h=9000&i=" + this.media.imdbID;
          this.favoriteProvider.checkFavoritesContainsMedia(this.media)
            .then(isAdded => {
              console.log("kikou");
              this.added = isAdded;
            });
        }
      });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private moviesProvider: MoviesProvider, private favoriteProvider: FavoriteProvider) {
    this.movieID = navParams.get("mediaID");
  }


}
