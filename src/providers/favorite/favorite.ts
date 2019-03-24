import { IMedia } from './../../interfaces/IMedia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  readonly storageKey = "favorites";

  constructor(private storage: Storage) {
  }

  public async getFavorites(): Promise<Array<IMedia>> {
    let medias : Array<IMedia>; 
     medias = await this.storage.get(this.storageKey);
     console.log(medias);
    return medias
  }

  public async setFavorites(medias: Array<IMedia>) {
    return await this.storage.set(this.storageKey, medias);
  }

  public async addFavorite(media: IMedia): Promise<any> {
    return new Promise(resolve => {
      this.getFavorites()
        .then(favs => {
          if (favs) {
            favs.push(media);
            this.storage.set(this.storageKey, favs)
              .then(() => {
                resolve(this.getFavorites());
              })
          } else {
            favs = Array<IMedia>();
            favs.push(media);
            this.storage.set(this.storageKey, favs)
              .then(() => {
                resolve(this.getFavorites());
              })
          }
        })
    })

  }

  public async removeFavorite(media: IMedia): Promise<any> {
    return new Promise(resolve => {
      this.getFavorites()
        .then(favs => {
          if (favs) {
            let i = 0;
            favs.forEach(favMedia => {
              if (favMedia.imdbID == media.imdbID) {
                favs.splice(i, 1);
                this.storage.set(this.storageKey, favs)
                  .then(() => {
                    resolve(this.getFavorites())
                  })
              }
              i++;
            });
          }
          resolve(null);
        })
    })

  }

  public checkFavoritesContainsMedia(media: IMedia): Promise<boolean> {
    return new Promise(resolve => {
      this.getFavorites()
        .then(favs => {
          if (!favs) {
            resolve(false);
          } else {
            if (favs.length == 0) {
              resolve(false);
            } else {
              favs.forEach(favMedia => {
                if (favMedia.imdbID == media.imdbID) {
                  resolve(true);
                }
              });
            }
          }
        });
    });
  }

  public clearFavorites(): Promise<any> {
    return new Promise(resolve => {
      let emptyArray = Array<IMedia>()
      this.storage.set(this.storageKey, emptyArray)
      resolve(emptyArray)
    })
  }
}
