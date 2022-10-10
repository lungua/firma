import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ActivitatiPrincipaleFormService, ActivitatiPrincipaleFormGroup } from './activitati-principale-form.service';
import { IActivitatiPrincipale } from '../activitati-principale.model';
import { ActivitatiPrincipaleService } from '../service/activitati-principale.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-activitati-principale-update',
  templateUrl: './activitati-principale-update.component.html',
})
export class ActivitatiPrincipaleUpdateComponent implements OnInit {
  isSaving = false;
  activitatiPrincipale: IActivitatiPrincipale | null = null;

  srlsSharedCollection: ISrl[] = [];

  editForm: ActivitatiPrincipaleFormGroup = this.activitatiPrincipaleFormService.createActivitatiPrincipaleFormGroup();

  constructor(
    protected activitatiPrincipaleService: ActivitatiPrincipaleService,
    protected activitatiPrincipaleFormService: ActivitatiPrincipaleFormService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activitatiPrincipale }) => {
      this.activitatiPrincipale = activitatiPrincipale;
      if (activitatiPrincipale) {
        this.updateForm(activitatiPrincipale);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const activitatiPrincipale = this.activitatiPrincipaleFormService.getActivitatiPrincipale(this.editForm);
    if (activitatiPrincipale.id !== null) {
      this.subscribeToSaveResponse(this.activitatiPrincipaleService.update(activitatiPrincipale));
    } else {
      this.subscribeToSaveResponse(this.activitatiPrincipaleService.create(activitatiPrincipale));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivitatiPrincipale>>): void {
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

  protected updateForm(activitatiPrincipale: IActivitatiPrincipale): void {
    this.activitatiPrincipale = activitatiPrincipale;
    this.activitatiPrincipaleFormService.resetForm(this.editForm, activitatiPrincipale);

    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, activitatiPrincipale.srl3);
  }

  protected loadRelationshipsOptions(): void {
    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.activitatiPrincipale?.srl3)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
