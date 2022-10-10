import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { BuletinFormService, BuletinFormGroup } from './buletin-form.service';
import { IBuletin } from '../buletin.model';
import { BuletinService } from '../service/buletin.service';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

@Component({
  selector: 'jhi-buletin-update',
  templateUrl: './buletin-update.component.html',
})
export class BuletinUpdateComponent implements OnInit {
  isSaving = false;
  buletin: IBuletin | null = null;

  asocAdminsSharedCollection: IAsocAdmin[] = [];

  editForm: BuletinFormGroup = this.buletinFormService.createBuletinFormGroup();

  constructor(
    protected buletinService: BuletinService,
    protected buletinFormService: BuletinFormService,
    protected asocAdminService: AsocAdminService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAsocAdmin = (o1: IAsocAdmin | null, o2: IAsocAdmin | null): boolean => this.asocAdminService.compareAsocAdmin(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ buletin }) => {
      this.buletin = buletin;
      if (buletin) {
        this.updateForm(buletin);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const buletin = this.buletinFormService.getBuletin(this.editForm);
    if (buletin.id !== null) {
      this.subscribeToSaveResponse(this.buletinService.update(buletin));
    } else {
      this.subscribeToSaveResponse(this.buletinService.create(buletin));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBuletin>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(buletin: IBuletin): void {
    this.buletin = buletin;
    this.buletinFormService.resetForm(this.editForm, buletin);

    this.asocAdminsSharedCollection = this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(
      this.asocAdminsSharedCollection,
      buletin.asocadmin1
    );
  }

  protected loadRelationshipsOptions(): void {
    this.asocAdminService
      .query()
      .pipe(map((res: HttpResponse<IAsocAdmin[]>) => res.body ?? []))
      .pipe(
        map((asocAdmins: IAsocAdmin[]) =>
          this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(asocAdmins, this.buletin?.asocadmin1)
        )
      )
      .subscribe((asocAdmins: IAsocAdmin[]) => (this.asocAdminsSharedCollection = asocAdmins));
  }
}
