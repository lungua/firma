import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AlteActivitatiFormService, AlteActivitatiFormGroup } from './alte-activitati-form.service';
import { IAlteActivitati } from '../alte-activitati.model';
import { AlteActivitatiService } from '../service/alte-activitati.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-alte-activitati-update',
  templateUrl: './alte-activitati-update.component.html',
})
export class AlteActivitatiUpdateComponent implements OnInit {
  isSaving = false;
  alteActivitati: IAlteActivitati | null = null;

  srlsSharedCollection: ISrl[] = [];

  editForm: AlteActivitatiFormGroup = this.alteActivitatiFormService.createAlteActivitatiFormGroup();

  constructor(
    protected alteActivitatiService: AlteActivitatiService,
    protected alteActivitatiFormService: AlteActivitatiFormService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alteActivitati }) => {
      this.alteActivitati = alteActivitati;
      if (alteActivitati) {
        this.updateForm(alteActivitati);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alteActivitati = this.alteActivitatiFormService.getAlteActivitati(this.editForm);
    if (alteActivitati.id !== null) {
      this.subscribeToSaveResponse(this.alteActivitatiService.update(alteActivitati));
    } else {
      this.subscribeToSaveResponse(this.alteActivitatiService.create(alteActivitati));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlteActivitati>>): void {
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

  protected updateForm(alteActivitati: IAlteActivitati): void {
    this.alteActivitati = alteActivitati;
    this.alteActivitatiFormService.resetForm(this.editForm, alteActivitati);

    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, alteActivitati.srl2);
  }

  protected loadRelationshipsOptions(): void {
    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.alteActivitati?.srl2)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
