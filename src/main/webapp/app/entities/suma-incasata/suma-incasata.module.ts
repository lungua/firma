import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SumaIncasataComponent } from './list/suma-incasata.component';
import { SumaIncasataDetailComponent } from './detail/suma-incasata-detail.component';
import { SumaIncasataUpdateComponent } from './update/suma-incasata-update.component';
import { SumaIncasataDeleteDialogComponent } from './delete/suma-incasata-delete-dialog.component';
import { SumaIncasataRoutingModule } from './route/suma-incasata-routing.module';

@NgModule({
  imports: [SharedModule, SumaIncasataRoutingModule],
  declarations: [SumaIncasataComponent, SumaIncasataDetailComponent, SumaIncasataUpdateComponent, SumaIncasataDeleteDialogComponent],
})
export class SumaIncasataModule {}
