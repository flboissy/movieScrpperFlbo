import { Config } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostersProvider {

  constructor(private config : Config) {
  }

  getPosterUrlById(imId : string){
    return this.config.get("posterUrl") + "&i=" + imId;
  }

}
