import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPage } from './movies';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MoviesPage),
  ],
})
export class MoviesPageModule {}
