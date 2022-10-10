import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IActivitatiSecundare } from '../activitati-secundare.model';
import { ActivitatiSecundareService } from '../service/activitati-secundare.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './activitati-secundare-delete-dialog.component.html',
})
export class ActivitatiSecundareDeleteDialogComponent {
  activitatiSecundare?: IActivitatiSecundare;

  constructor(protected activitatiSecundareService: ActivitatiSecundareService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.activitatiSecundareService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
