import { ComponentsModule } from './../../components/components.module';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDetailPage } from './movie-detail';

@NgModule({
  declarations: [
    MovieDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MovieDetailPage)
  ],
})
export class MovieDetailPageModule {}
