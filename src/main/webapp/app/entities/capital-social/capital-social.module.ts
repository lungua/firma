import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CapitalSocialComponent } from './list/capital-social.component';
import { CapitalSocialDetailComponent } from './detail/capital-social-detail.component';
import { CapitalSocialUpdateComponent } from './update/capital-social-update.component';
import { CapitalSocialDeleteDialogComponent } from './delete/capital-social-delete-dialog.component';
import { CapitalSocialRoutingModule } from './route/capital-social-routing.module';

@NgModule({
  imports: [SharedModule, CapitalSocialRoutingModule],
  declarations: [CapitalSocialComponent, CapitalSocialDetailComponent, CapitalSocialUpdateComponent, CapitalSocialDeleteDialogComponent],
})
export class CapitalSocialModule {}
