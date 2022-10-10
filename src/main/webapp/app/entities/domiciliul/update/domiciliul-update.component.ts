import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DomiciliulFormService, DomiciliulFormGroup } from './domiciliul-form.service';
import { IDomiciliul } from '../domiciliul.model';
import { DomiciliulService } from '../service/domiciliul.service';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

@Component({
  selector: 'jhi-domiciliul-update',
  templateUrl: './domiciliul-update.component.html',
})
export class DomiciliulUpdateComponent implements OnInit {
  isSaving = false;
  domiciliul: IDomiciliul | null = null;

  asocAdminsSharedCollection: IAsocAdmin[] = [];

  editForm: DomiciliulFormGroup = this.domiciliulFormService.createDomiciliulFormGroup();

  constructor(
    protected domiciliulService: DomiciliulService,
    protected domiciliulFormService: DomiciliulFormService,
    protected asocAdminService: AsocAdminService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAsocAdmin = (o1: IAsocAdmin | null, o2: IAsocAdmin | null): boolean => this.asocAdminService.compareAsocAdmin(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ domiciliul }) => {
      this.domiciliul = domiciliul;
      if (domiciliul) {
        this.updateForm(domiciliul);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const domiciliul = this.domiciliulFormService.getDomiciliul(this.editForm);
    if (domiciliul.id !== null) {
      this.subscribeToSaveResponse(this.domiciliulService.update(domiciliul));
    } else {
      this.subscribeToSaveResponse(this.domiciliulService.create(domiciliul));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDomiciliul>>): void {
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

  protected updateForm(domiciliul: IDomiciliul): void {
    this.domiciliul = domiciliul;
    this.domiciliulFormService.resetForm(this.editForm, domiciliul);

    this.asocAdminsSharedCollection = this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(
      this.asocAdminsSharedCollection,
      domiciliul.asocadmin3
    );
  }

  protected loadRelationshipsOptions(): void {
    this.asocAdminService
      .query()
      .pipe(map((res: HttpResponse<IAsocAdmin[]>) => res.body ?? []))
      .pipe(
        map((asocAdmins: IAsocAdmin[]) =>
          this.asocAdminService.addAsocAdminToCollectionIfMissing<IAsocAdmin>(asocAdmins, this.domiciliul?.asocadmin3)
        )
      )
      .subscribe((asocAdmins: IAsocAdmin[]) => (this.asocAdminsSharedCollection = asocAdmins));
  }
}
