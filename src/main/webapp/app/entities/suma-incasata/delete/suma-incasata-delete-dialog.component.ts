import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISumaIncasata } from '../suma-incasata.model';
import { SumaIncasataService } from '../service/suma-incasata.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './suma-incasata-delete-dialog.component.html',
})
export class SumaIncasataDeleteDialogComponent {
  sumaIncasata?: ISumaIncasata;

  constructor(protected sumaIncasataService: SumaIncasataService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sumaIncasataService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
