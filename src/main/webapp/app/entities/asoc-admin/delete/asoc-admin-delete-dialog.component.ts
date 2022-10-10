import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsocAdmin } from '../asoc-admin.model';
import { AsocAdminService } from '../service/asoc-admin.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './asoc-admin-delete-dialog.component.html',
})
export class AsocAdminDeleteDialogComponent {
  asocAdmin?: IAsocAdmin;

  constructor(protected asocAdminService: AsocAdminService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.asocAdminService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
