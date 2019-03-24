import { FavoritePageModule } from './../pages/favorite/favorite.module';
import { SeasonDetailPageModule } from './../pages/season-detail/season-detail.module';
import { SerieDetailPageModule } from './../pages/serie-detail/serie-detail.module';
import { YoutubeProvider } from './../providers/youtube/youtube';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SeriesPageModule } from './../pages/series/series.module';
import { MoviesPageModule } from './../pages/movies/movies.module';
import { MovieDetailPageModule } from './../pages/movie-detail/movie-detail.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MoviesProvider } from '../providers/movies/movies';
import { SeriesProvider } from '../providers/series/series';
import { PostersProvider } from '../providers/posters/posters';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { EpisodeDetailPageModule } from '../pages/episode-detail/episode-detail.module';
import { IonicStorageModule } from '@ionic/storage';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { MediaToCsvProvider } from '../providers/media-to-csv/media-to-csv';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MoviesPageModule,
    SeriesPageModule,
    MovieDetailPageModule,
    SerieDetailPageModule,
    SeasonDetailPageModule,
    EpisodeDetailPageModule,
    FavoritePageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesProvider,
    SeriesProvider,
    PostersProvider,
    File,
    FileTransfer,
    YoutubeProvider,
    YoutubeVideoPlayer,
    FavoriteProvider,
    MediaToCsvProvider,
    FileChooser,
    FilePath
  ]
})
export class AppModule {}
