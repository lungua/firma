import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IActivitatiPrincipale } from '../activitati-principale.model';
import { ActivitatiPrincipaleService } from '../service/activitati-principale.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './activitati-principale-delete-dialog.component.html',
})
export class ActivitatiPrincipaleDeleteDialogComponent {
  activitatiPrincipale?: IActivitatiPrincipale;

  constructor(protected activitatiPrincipaleService: ActivitatiPrincipaleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.activitatiPrincipaleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
