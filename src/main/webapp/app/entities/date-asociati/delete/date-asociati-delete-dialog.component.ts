import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDateAsociati } from '../date-asociati.model';
import { DateAsociatiService } from '../service/date-asociati.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './date-asociati-delete-dialog.component.html',
})
export class DateAsociatiDeleteDialogComponent {
  dateAsociati?: IDateAsociati;

  constructor(protected dateAsociatiService: DateAsociatiService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dateAsociatiService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
