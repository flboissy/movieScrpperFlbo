import { SerieDetailPage } from './../serie-detail/serie-detail';
import { SeriesProvider } from './../../providers/series/series';
import { IMedia } from './../../interfaces/IMedia';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {

  public series : Array<IMedia>;
  public currentPage = 1;
  public currentSearchString : string;
  public detailPage = SerieDetailPage

  constructor(public navCtrl: NavController, public navParams: NavParams, public seriesProvider : SeriesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeriesPage');
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      this.currentPage++;
      this.seriesProvider.searchSeriesByName(this.currentSearchString, this.currentPage)
        .then(results => {
          this.series = this.series.concat(results);
          this.series.forEach(serie => {
            serie.Poster = "http://img.omdbapi.com/?apikey=75522b56&i=" + serie.imdbID;
          });

        });
      infiniteScroll.complete();
    }, 500);
  }

  onSearchChanged(search : string){
    this.currentSearchString = search;
  }

  onMediasChanged(medias : Array<IMedia>){
    this.series = medias;
  }

}
