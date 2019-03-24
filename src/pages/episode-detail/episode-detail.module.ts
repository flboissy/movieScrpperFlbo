import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodeDetailPage } from './episode-detail';

@NgModule({
  declarations: [
    EpisodeDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EpisodeDetailPage),
  ],
})
export class EpisodeDetailPageModule {}
