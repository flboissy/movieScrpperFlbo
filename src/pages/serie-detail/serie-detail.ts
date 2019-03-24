import { FavoriteProvider } from './../../providers/favorite/favorite';
import { SeriesProvider } from './../../providers/series/series';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ISerie } from '../../interfaces/ISerie';

/**
 * Generated class for the SerieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie-detail',
  templateUrl: 'serie-detail.html',
})
export class SerieDetailPage {

  public serie : ISerie;
  public added : boolean;


  ionViewWillEnter(){
    this.favoriteProvider.checkFavoritesContainsMedia(this.serie)
    .then(isAdded => {
      this.added = isAdded;
    })
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private seriesProvider : SeriesProvider, private favoriteProvider : FavoriteProvider) {
    let serieID = navParams.get("mediaID");
    seriesProvider.getSerieById(serieID)
      .then((serieResult) => {
        if(serieResult){
          this.serie = serieResult;
          this.serie.Poster = "http://img.omdbapi.com/?apikey=75522b56&h=7000&i=" + this.serie.imdbID;
        }
      })
  }
}
