import { IMovie } from './../../interfaces/IMovie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {

    private apiUrl = "http://www.omdbapi.com/?apikey=75522b56";

    constructor(public http: HttpClient) {

    }

    searchMovieByName(search: string, pageNumber: number): Promise<Array<IMovie>> {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '&s=' + search + '&type=movie' + '&page=' + pageNumber)
                .subscribe(data => {
                    // @ts-ignore
                    resolve(data.Search);
                }, err => {
                    console.log(err);
                });
        })
    }

    getMovieById(movieID : string) : Promise<IMovie>{
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '&plot=full&i=' + movieID)
            .subscribe(movie => {
                //@ts-ignore
                resolve(movie);
            })
        })
    }


}
