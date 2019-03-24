import { SerieDetailPage } from './../../pages/serie-detail/serie-detail';
import { MovieDetailPage } from './../../pages/movie-detail/movie-detail';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { IMedia } from '../../interfaces/IMedia';
import { Page } from 'ionic-angular/navigation/nav-util';

/**
 * Generated class for the MediaListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-list',
  templateUrl: 'media-list.html'
})
export class MediaListComponent {

  @Input() medias: Array<IMedia>;
  public errorImg = "/assets/imgs/poster_error.png";
  constructor(private navCtrl: NavController) {
  }

  navigateToDetail(media: IMedia) {
    switch (media.Type) {
      case "movie":
        this.navCtrl.push(MovieDetailPage, { mediaID: media.imdbID });
        break;
      case "series":
        this.navCtrl.push(SerieDetailPage, { mediaID: media.imdbID });
        break;
    }
  }

}
