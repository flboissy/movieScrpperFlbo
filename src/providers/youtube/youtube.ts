import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the YoutubeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YoutubeProvider {

  private apiUrl: string ='https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=';
  private key: string ='AIzaSyDq2YBXw3Uympg72tUCvoTCu0qngqCIUN0';
  private type : string = "&type=video"
  private q : string ='&q=';

  constructor(public http: HttpClient) {
  }

  getVideoIdFromTitle(videoTitle : string) : Promise<string>{
    return new Promise(resolve => {
      this.http.get(this.apiUrl + this.key + this.type + this.q + videoTitle + " trailer")
          .subscribe(data => {
              // @ts-ignore
              resolve(data.items[0].id.videoId);
          }, err => {
              console.log(err);
          });
  })
  }

}
