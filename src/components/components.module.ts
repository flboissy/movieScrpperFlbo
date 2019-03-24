import { NgModule } from '@angular/core';
import { MediaDetailComponent } from './media-detail/media-detail';
import { IonicModule } from 'ionic-angular';
import { MediaListComponent } from './media-list/media-list';
import { MediaSearchBarComponent } from './media-search-bar/media-search-bar';
import { SeasonListComponent } from './season-list/season-list';
@NgModule({
	declarations: [MediaDetailComponent,
    MediaListComponent,
    MediaSearchBarComponent,
    SeasonListComponent],
	imports: [IonicModule],
	exports: [MediaDetailComponent,
    MediaListComponent,
    MediaSearchBarComponent,
    SeasonListComponent]
})
export class ComponentsModule {}
