import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerieDetailPage } from './serie-detail';

@NgModule({
  declarations: [
    SerieDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SerieDetailPage),
  ],
})
export class SerieDetailPageModule {}
