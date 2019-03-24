import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritePage } from './favorite';

@NgModule({
  declarations: [
    FavoritePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FavoritePage),
  ],
})
export class FavoritePageModule {}
