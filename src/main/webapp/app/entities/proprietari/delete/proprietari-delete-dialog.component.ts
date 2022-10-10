import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProprietari } from '../proprietari.model';
import { ProprietariService } from '../service/proprietari.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './proprietari-delete-dialog.component.html',
})
export class ProprietariDeleteDialogComponent {
  proprietari?: IProprietari;

  constructor(protected proprietariService: ProprietariService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proprietariService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
