import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ActivitatiSecundareFormService, ActivitatiSecundareFormGroup } from './activitati-secundare-form.service';
import { IActivitatiSecundare } from '../activitati-secundare.model';
import { ActivitatiSecundareService } from '../service/activitati-secundare.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-activitati-secundare-update',
  templateUrl: './activitati-secundare-update.component.html',
})
export class ActivitatiSecundareUpdateComponent implements OnInit {
  isSaving = false;
  activitatiSecundare: IActivitatiSecundare | null = null;

  srlsSharedCollection: ISrl[] = [];

  editForm: ActivitatiSecundareFormGroup = this.activitatiSecundareFormService.createActivitatiSecundareFormGroup();

  constructor(
    protected activitatiSecundareService: ActivitatiSecundareService,
    protected activitatiSecundareFormService: ActivitatiSecundareFormService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activitatiSecundare }) => {
      this.activitatiSecundare = activitatiSecundare;
      if (activitatiSecundare) {
        this.updateForm(activitatiSecundare);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const activitatiSecundare = this.activitatiSecundareFormService.getActivitatiSecundare(this.editForm);
    if (activitatiSecundare.id !== null) {
      this.subscribeToSaveResponse(this.activitatiSecundareService.update(activitatiSecundare));
    } else {
      this.subscribeToSaveResponse(this.activitatiSecundareService.create(activitatiSecundare));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivitatiSecundare>>): void {
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

  protected updateForm(activitatiSecundare: IActivitatiSecundare): void {
    this.activitatiSecundare = activitatiSecundare;
    this.activitatiSecundareFormService.resetForm(this.editForm, activitatiSecundare);

    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, activitatiSecundare.srl5);
  }

  protected loadRelationshipsOptions(): void {
    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.activitatiSecundare?.srl5)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
