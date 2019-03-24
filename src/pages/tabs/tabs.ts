import { FavoritePage } from './../favorite/favorite';
import { SeriesPage } from './../series/series';
import { MoviesPage } from './../movies/movies';

import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MoviesPage;
  tab2Root = SeriesPage;
  tab3Root = FavoritePage;

  constructor() {

  }
}
