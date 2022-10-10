import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DateAsociatiFormService, DateAsociatiFormGroup } from './date-asociati-form.service';
import { IDateAsociati } from '../date-asociati.model';
import { DateAsociatiService } from '../service/date-asociati.service';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

@Component({
  selector: 'jhi-date-asociati-update',
  templateUrl: './date-asociati-update.component.html',
})
export class DateAsociatiUpdateComponent implements OnInit {
  isSaving = false;
  dateAsociati: IDateAsociati | null = null;

  asocAdminsSharedCollection: IAsocAdmin[] = [];

  editForm: DateAsociatiFormGroup = this.dateAsociatiFormService.createDateAsociatiFormGroup();

  constructor(
    protected dateAsociatiService: DateAsociatiService,
    protected dateAsociatiFormService: DateAsociatiFormService,
    protected asocAdminService: AsocAdminService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAsocAdmin = (o1: IAsocAdmin | null, o2: IAsocAdmin | null): boolean => this.asocAdminService.compareAsocAdmin(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dateAsociati }) => {
      this.dateAsociati = dateAsociati;
      if (dateAsociati) {
        this.updateForm(dateAsociati);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dateAsociati = this.dateAsociatiFormService.getDateAsociati(this.editForm);
    if (dateAsociati.id !== null) {
      this.subscribeToSaveResponse(this.dateAsociatiService.update(dateAsociati));
    } else {
      this.subscribeToSaveResponse(this.dateAsociatiService.create(dateAsociati));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDateAsociati>>): void {
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

  protected updateForm(dateAsociati: IDateAsociati): void {
    this.dateAsociati = dateAsociati;
    this.dateAsociatiFormService.resetForm(this.editForm, dateAsociati);

    this.asocAdminsSharedCollection = this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(
      this.asocAdminsSharedCollection,
      dateAsociati.asocadmin4
    );
  }

  protected loadRelationshipsOptions(): void {
    this.asocAdminService
      .query()
      .pipe(map((res: HttpResponse<IAsocAdmin[]>) => res.body ?? []))
      .pipe(
        map((asocAdmins: IAsocAdmin[]) =>
          this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(asocAdmins, this.dateAsociati?.asocadmin4)
        )
      )
      .subscribe((asocAdmins: IAsocAdmin[]) => (this.asocAdminsSharedCollection = asocAdmins));
  }
}
