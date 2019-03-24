import { FavoriteProvider } from './../../providers/favorite/favorite';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeProvider } from './../../providers/youtube/youtube';
import { IMedia } from './../../interfaces/IMedia';
import { Component, Input } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the MediaDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-detail',
  templateUrl: 'media-detail.html'
})
export class MediaDetailComponent {

  @Input() media: IMedia;
  public genres: Array<string>;
  public actors: Array<string>;
  @Input() public added: boolean

  constructor(public transfer: FileTransfer, public file: File, private ytProvider: YoutubeProvider, private favoriteProvider: FavoriteProvider, private ytVideo: YoutubeVideoPlayer) {

  }


  ngOnInit() {
    this.genres = this.media.Genre.trim().split(",");
    this.actors = this.media.Actors.trim().split(",");
  }


  

  downloadImg() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.media.Poster;
    let dir = 'Download';
    let nameFile = this.media.imdbID + '.jpg'
    this.file.createDir(this.file.externalRootDirectory, dir, true)
      .then(
        (data) => {
          fileTransfer.download(url, data.toURL() + nameFile).then((entry) => {
            console.log('download complete: ' + entry.toURL());
            alert('download complete: ' + dir + '/' + nameFile)
          }, (error) => {

          });
        }
      ).catch(e => console.log(e))
  }

  openYoutubeTrailer() {
    console.log(this.media.Title);
    this.ytProvider.getVideoIdFromTitle(this.media.Title)
      .then((id) => {
        this.ytVideo.openVideo(id);
      })
  }

  addTofavoris() {
    this.favoriteProvider.addFavorite(this.media)
      .then(() => {
        this.added = true;
      })
  }

  removeFromFavoris() {
    this.favoriteProvider.removeFavorite(this.media)
      .then(() => {
        this.added = false;
      })
  }
}
