import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlteActivitati } from '../alte-activitati.model';
import { AlteActivitatiService } from '../service/alte-activitati.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './alte-activitati-delete-dialog.component.html',
})
export class AlteActivitatiDeleteDialogComponent {
  alteActivitati?: IAlteActivitati;

  constructor(protected alteActivitatiService: AlteActivitatiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alteActivitatiService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
