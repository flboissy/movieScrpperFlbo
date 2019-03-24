import { SeriesProvider } from './../../providers/series/series';
import { MoviesProvider } from './../../providers/movies/movies';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMedia } from '../../interfaces/IMedia';

/**
 * Generated class for the MediaSearchBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-search-bar',
  templateUrl: 'media-search-bar.html'
})
export class MediaSearchBarComponent {


  @Input() medias: Array<IMedia>;
  @Input() currentPage: number;
  @Input() searchString: string;
  @Input() pageName: string;
  @Input() isMovies: boolean;
  @Input() currentSearchString: string;
  @Output() searchChanged = new EventEmitter<string>();
  @Output() mediasChanged = new EventEmitter<Array<IMedia>>();
  public isSearchBarAvailable = false;


  constructor(private moviesProvider: MoviesProvider, private seriesProvider: SeriesProvider) {
  }

  searchBarChange(searchValue: string) {
    this.resetBar();
    this.currentSearchString = searchValue;
    this.searchChanged.emit(this.currentSearchString);

    if (this.isMovies) {
      this.moviesProvider.searchMovieByName(searchValue, this.currentPage)
        .then((results) => {
          if (results) {
            this.medias = results;
            this.medias.forEach(media => {
              media.Poster = "http://img.omdbapi.com/?apikey=75522b56&h=9000&i=" + media.imdbID;
            });
            this.mediasChanged.emit(this.medias);
          } else {
            this.medias = [];
            this.mediasChanged.emit(this.medias);
          }
        })
    } else {
      this.seriesProvider.searchSeriesByName(searchValue, this.currentPage)
        .then((results) => {
          if (results) {
            this.medias = results;
            this.medias.forEach(media => {
              media.Poster = "http://img.omdbapi.com/?apikey=75522b56&h=9000&i=" + media.imdbID;
            });
            this.mediasChanged.emit(this.medias);
          } else {
            this.medias = [];
            this.mediasChanged.emit(this.medias);
          }
        })
    }

  }


  openSearchBar() {
    this.isSearchBarAvailable = !this.isSearchBarAvailable;
  }

  resetBar() {
    this.currentSearchString = "";
    this.currentPage = 1;
    this.medias = [];
  }
}
