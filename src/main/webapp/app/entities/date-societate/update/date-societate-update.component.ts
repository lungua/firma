import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DateSocietateFormService, DateSocietateFormGroup } from './date-societate-form.service';
import { IDateSocietate } from '../date-societate.model';
import { DateSocietateService } from '../service/date-societate.service';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

@Component({
  selector: 'jhi-date-societate-update',
  templateUrl: './date-societate-update.component.html',
})
export class DateSocietateUpdateComponent implements OnInit {
  isSaving = false;
  dateSocietate: IDateSocietate | null = null;

  asocAdminsSharedCollection: IAsocAdmin[] = [];

  editForm: DateSocietateFormGroup = this.dateSocietateFormService.createDateSocietateFormGroup();

  constructor(
    protected dateSocietateService: DateSocietateService,
    protected dateSocietateFormService: DateSocietateFormService,
    protected asocAdminService: AsocAdminService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAsocAdmin = (o1: IAsocAdmin | null, o2: IAsocAdmin | null): boolean => this.asocAdminService.compareAsocAdmin(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dateSocietate }) => {
      this.dateSocietate = dateSocietate;
      if (dateSocietate) {
        this.updateForm(dateSocietate);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dateSocietate = this.dateSocietateFormService.getDateSocietate(this.editForm);
    if (dateSocietate.id !== null) {
      this.subscribeToSaveResponse(this.dateSocietateService.update(dateSocietate));
    } else {
      this.subscribeToSaveResponse(this.dateSocietateService.create(dateSocietate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDateSocietate>>): void {
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

  protected updateForm(dateSocietate: IDateSocietate): void {
    this.dateSocietate = dateSocietate;
    this.dateSocietateFormService.resetForm(this.editForm, dateSocietate);

    this.asocAdminsSharedCollection = this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(
      this.asocAdminsSharedCollection,
      dateSocietate.asocadmin2
    );
  }

  protected loadRelationshipsOptions(): void {
    this.asocAdminService
      .query()
      .pipe(map((res: HttpResponse<IAsocAdmin[]>) => res.body ?? []))
      .pipe(
        map((asocAdmins: IAsocAdmin[]) =>
          this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(asocAdmins, this.dateSocietate?.asocadmin2)
        )
      )
      .subscribe((asocAdmins: IAsocAdmin[]) => (this.asocAdminsSharedCollection = asocAdmins));
  }
}
