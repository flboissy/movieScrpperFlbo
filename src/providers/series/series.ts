import { ISeason } from './../../interfaces/ISeason';
import { ISerie } from './../../interfaces/ISerie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEpisode } from '../../interfaces/IEpisode';
import { resolveDefinition } from '@angular/core/src/view/util';

/*
  Generated class for the SeriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeriesProvider {

  private apiUrl = "http://www.omdbapi.com/?apikey=75522b56";


  constructor(public http: HttpClient) {
  }

  searchSeriesByName(search: string, pageNumber: number): Promise<Array<ISerie>> {
    return new Promise(resolve => {
        this.http.get(this.apiUrl + '&s=' + search + '&type=series' + '&page=' + pageNumber)
            .subscribe(data => {
                // @ts-ignore
                resolve(data.Search);
            }, err => {
                console.log(err);
            });
    })
}

getSerieById(serieID : string) : Promise<ISerie>{
    return new Promise(resolve => {
        this.http.get(this.apiUrl + '&plot=full&i=' + serieID)
        .subscribe(movie => {
            //@ts-ignore
            resolve(movie);
        })
    })
}

getSeasonFromSerie(serieID : string, season : number) : Promise<ISeason> {
    return new Promise(resolve => {
        this.http.get(this.apiUrl + "&i=" + serieID + "&season=" + season)
        .subscribe(season => {
            //@ts-ignore
            resolve(season);
        });
    });
}

getEpisodeFromSeason(serieID : string, seasonNumber : number, episodeNumber : number) : Promise<IEpisode>{
    return new Promise(resolve => {
        this.http.get(this.apiUrl + "&i=" + serieID + "&season=" + seasonNumber + "&episode=" + episodeNumber)
        .subscribe(episode => {
            //@ts-ignore
            resolve(episode)
        })
    })
}

getAllEpisodesDetailFromSeason(serieID : string, seasonNumber : number) : Promise<Array<IEpisode>>{
    var season;
    let numberOfEpisodesInSeason = 0;
    let promiseArray = Array<Promise<IEpisode>>();
    return new Promise(resolve => {
        this.getSeasonFromSerie(serieID, seasonNumber)
        .then((seasonResult) => {
            numberOfEpisodesInSeason = seasonResult.Episodes.length;
            for(var i = 0; i < numberOfEpisodesInSeason; i++){
                promiseArray.push(this.getEpisodeFromSeason(serieID, seasonNumber, i+1));
            }
             Promise.all(promiseArray)
                .then(episodes => {
                    resolve(episodes);
                })
        })
    })
   
}

}
