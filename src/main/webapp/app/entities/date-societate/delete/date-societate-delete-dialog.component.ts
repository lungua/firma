import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDateSocietate } from '../date-societate.model';
import { DateSocietateService } from '../service/date-societate.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './date-societate-delete-dialog.component.html',
})
export class DateSocietateDeleteDialogComponent {
  dateSocietate?: IDateSocietate;

  constructor(protected dateSocietateService: DateSocietateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dateSocietateService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
