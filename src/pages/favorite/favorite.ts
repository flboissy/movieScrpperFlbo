import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { MediaToCsvProvider } from './../../providers/media-to-csv/media-to-csv';
import { FavoriteProvider } from './../../providers/favorite/favorite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { IMedia } from '../../interfaces/IMedia';


/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  public medias: Array<IMedia>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoritesProvider: FavoriteProvider,
    private actionSheetCtrl: ActionSheetController,
    private mediaToCSVProvider: MediaToCsvProvider,
    private file: File,
    private alrtCtrl: AlertController,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private filePath: FilePath
  ) {
  }

  ionViewWillEnter() {
    this.favoritesProvider.getFavorites()
      .then(favorites => {
        this.medias = favorites;
      })
  }

  openActionSheet() {
    let actionsheet = this.actionSheetCtrl.create({
      title: "Choose action",
      buttons: [{
        text: 'Export CSV',
        handler: () => this.export("csv")
      },
      {
        text: 'Import CSV',
        handler: () => this.import()

      },
      {
        text: 'Export JSON',
        handler: () => this.export("json")

      },
      {
        text: 'Import JSON',
        handler: () => this.import()

      },
      {
        text: 'Remove all',
        role: 'destructive',
        handler: () => this.removeAll()
      },
      {
        text: 'Annuler',
        role: 'cancel'
      }
      ]
    });
    actionsheet.present();
  }

  export(type: string) {
    let dir = 'Download';
    let filename = 'my_favorite-list'
    switch (type) {
      case "csv":
        this.file.createDir(this.file.externalRootDirectory, dir, true)
          .then((data) => {
            this.file.writeFile(data.toInternalURL(), filename + ".csv", this.mediaToCSVProvider.mediasToCSV(this.medias), { replace: true })
              .then(() => {
                let alrt = this.alrtCtrl.create({
                  title: "Favorite exported",
                  message: "Favorite correctly exported to: " + data.fullPath,
                  buttons: ["Ok"]
                })
                alrt.present();
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
        break;
      case "json":
        this.file.createDir(this.file.externalRootDirectory, dir, true)
          .then((data) => {
            this.file.writeFile(data.toInternalURL(), filename + ".json", JSON.stringify(this.medias), { replace: true })
              .then(() => {
                let alrt = this.alrtCtrl.create({
                  title: "Favorite exported",
                  message: "Favorite correctly exported to: " + data.fullPath,
                  buttons: ["Ok"]
                })
                alrt.present();
              })
              .catch((err) => {
                console.log(err);
              })
          })
        break;
    }
  }

  import() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.fileChooser.open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri)
          .then((resolvedFilePath) => {
            let path = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
            let file = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
            let extension = file.substring(file.lastIndexOf(".") + 1, file.length);
            switch (extension) {
              case "csv":
                this.file.readAsBinaryString(path, file).then((value) => {
                  this.medias = this.mediaToCSVProvider.CSVtoMedias(value);
                  this.favoritesProvider.setFavorites(this.medias);
                  console.log(this.medias);
                })
                break;
              case "json":
                this.file.readAsBinaryString(path, file).then((value) => {
                  this.medias = JSON.parse(value);
                  this.favoritesProvider.setFavorites(this.medias);
                })
                break;
              default:
                let alrt = this.alrtCtrl.create({
                  title: "Bad file selected",
                  message: "Please select a csv or a json file",
                  buttons: ["Ok"]
                })
                alrt.present();
                break;
            }
          })

      })
  }

  removeAll() {
    this.favoritesProvider.clearFavorites()
      .then(favs => {
        this.medias = favs;
      })
  }

}
