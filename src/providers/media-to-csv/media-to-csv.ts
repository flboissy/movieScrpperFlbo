import { IMedia } from './../../interfaces/IMedia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

/*
  Generated class for the MediaToCsvProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaToCsvProvider {

  private CSVHeader = ["Title",
    "Year",
    "Rated",
    "Released",
    "Runtime",
    "Genre",
    "Director",
    "Writer",
    "Actors",
    "Plot",
    "Language",
    "Country",
    "Awards",
    "Poster",
    "Ratings",
    "Metascore",
    "imdbRating",
    "imdbVotes",
    "imdbID",
    "Type"]

  constructor(public http: HttpClient) {
    console.log('Hello MediaToCsvProvider Provider');
  }
  

  public initHeader() : string{
    let headerValue = "";
    this.CSVHeader.forEach(header => {
      if(headerValue != ""){
        headerValue += ";"
      }
      headerValue += header;
    });
    headerValue += "\r\n";
    return headerValue;
  }

  public mediasToCSV(medias : Array<IMedia>) : string{
    let csvValue = "";
    csvValue += this.initHeader();
    medias.forEach(media => {
      csvValue +=  this.mediaToCSV(media);
    });
    return csvValue;
  }

  private mediaToCSV(media: IMedia) : string {
    let arrayItem = JSON.parse(JSON.stringify(media));
    let mediaCSV = "";
    
    Object.keys(media).forEach(key => {
      if (mediaCSV != ""){
        mediaCSV += ";";
      }
      mediaCSV += media[key];
    });
    mediaCSV += "\r\n";
    return mediaCSV;
  }

  private CSVtoMedia(mediaCSV : string) : any{
    let values = mediaCSV.split(";");
    console.log("csv to media");
    console.log(values);
    var result = {};
    for(var i = 0; i < this.CSVHeader.length; i++){
      result[this.CSVHeader[i]] = values[i];
    }
    return result;
  }

  public CSVtoMedias(mediasCSV : string): Array<IMedia>{
    
    let values = mediasCSV.split("\r\n");
    console.log("csv to medias");
    console.log(values);
    var results = Array<IMedia>()
    var media : IMedia;
    for(var i = 1; i < values.length - 1 ; i++){
      console.log("index: " + i);
      //@ts-ignore
      media = this.CSVtoMedia(values[i]);
      results.push(media);
    }
    console.log(results);
    return results;
  }

}
