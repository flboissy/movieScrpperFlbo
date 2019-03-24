import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEpisode } from '../../interfaces/IEpisode';

/**
 * Generated class for the EpisodeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode-detail',
  templateUrl: 'episode-detail.html',
})
export class EpisodeDetailPage {

  public episode : IEpisode
  public added : boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, private favoriteProvider : FavoriteProvider) {
   this.episode = navParams.get("episode");
  }

  
  ionViewWillEnter(){
    this.favoriteProvider.checkFavoritesContainsMedia(this.episode)
    .then(isAdded => {
      this.added = isAdded;
    })
  }
  
}
