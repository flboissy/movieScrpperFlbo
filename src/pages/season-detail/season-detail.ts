import { EpisodeDetailPage } from './../episode-detail/episode-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEpisode } from '../../interfaces/IEpisode';

/**
 * Generated class for the SeasonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-season-detail',
  templateUrl: 'season-detail.html',
})
export class SeasonDetailPage {

  public episodes : Array<IEpisode>;
  public seasonNumber : number;

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.episodes  = navParams.get("episodesList");
  }

  navigateToEpisodeDetail(episode : IEpisode){
    this.navCtrl.push(EpisodeDetailPage, {episode : episode});
  }

}
