import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AsocAdminFormService, AsocAdminFormGroup } from './asoc-admin-form.service';
import { IAsocAdmin } from '../asoc-admin.model';
import { AsocAdminService } from '../service/asoc-admin.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-asoc-admin-update',
  templateUrl: './asoc-admin-update.component.html',
})
export class AsocAdminUpdateComponent implements OnInit {
  isSaving = false;
  asocAdmin: IAsocAdmin | null = null;

  srlsSharedCollection: ISrl[] = [];

  editForm: AsocAdminFormGroup = this.asocAdminFormService.createAsocAdminFormGroup();

  constructor(
    protected asocAdminService: AsocAdminService,
    protected asocAdminFormService: AsocAdminFormService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asocAdmin }) => {
      this.asocAdmin = asocAdmin;
      if (asocAdmin) {
        this.updateForm(asocAdmin);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const asocAdmin = this.asocAdminFormService.getAsocAdmin(this.editForm);
    if (asocAdmin.id !== null) {
      this.subscribeToSaveResponse(this.asocAdminService.update(asocAdmin));
    } else {
      this.subscribeToSaveResponse(this.asocAdminService.create(asocAdmin));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsocAdmin>>): void {
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

  protected updateForm(asocAdmin: IAsocAdmin): void {
    this.asocAdmin = asocAdmin;
    this.asocAdminFormService.resetForm(this.editForm, asocAdmin);

    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, asocAdmin.srl);
  }

  protected loadRelationshipsOptions(): void {
    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.asocAdmin?.srl)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
