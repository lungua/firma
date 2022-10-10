import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDomiciliul } from '../domiciliul.model';
import { DomiciliulService } from '../service/domiciliul.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './domiciliul-delete-dialog.component.html',
})
export class DomiciliulDeleteDialogComponent {
  domiciliul?: IDomiciliul;

  constructor(protected domiciliulService: DomiciliulService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.domiciliulService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
