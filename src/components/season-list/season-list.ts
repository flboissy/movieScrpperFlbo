import { SeasonDetailPage } from './../../pages/season-detail/season-detail';
import { NavController } from 'ionic-angular';
import { SeriesProvider } from './../../providers/series/series';
import { ISeason } from './../../interfaces/ISeason';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the SeasonListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'season-list',
  templateUrl: 'season-list.html'
})
export class SeasonListComponent {
  
  @Input() poster : string;
  @Input() numberOfSeason : number;
  @Input() mediaID : string;
  public seasons : Array<number>;
  public errorImg = "/assets/imgs/poster_error.png"

  constructor(private navCtrl : NavController,private seriesProvider : SeriesProvider) {
   this.seasons = new Array<number>();
  }

  ngOnInit() {
    for(let i = 0 ; i < this.numberOfSeason ; i++){
      this.seasons.push(i+1)
    }
    console.log(this.seasons);
  }


  navigateToSeason(season : number){
    this.seriesProvider.getAllEpisodesDetailFromSeason(this.mediaID,season + 1)
    .then(episodes => {
      this.navCtrl.push(SeasonDetailPage, {episodesList : episodes})
    })
  }
}
