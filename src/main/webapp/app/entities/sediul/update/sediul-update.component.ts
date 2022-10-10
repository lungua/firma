import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SediulFormService, SediulFormGroup } from './sediul-form.service';
import { ISediul } from '../sediul.model';
import { SediulService } from '../service/sediul.service';
import { IActivitatiPrincipale } from 'app/entities/activitati-principale/activitati-principale.model';
import { ActivitatiPrincipaleService } from 'app/entities/activitati-principale/service/activitati-principale.service';
import { IActivitatiSecundare } from 'app/entities/activitati-secundare/activitati-secundare.model';
import { ActivitatiSecundareService } from 'app/entities/activitati-secundare/service/activitati-secundare.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-sediul-update',
  templateUrl: './sediul-update.component.html',
})
export class SediulUpdateComponent implements OnInit {
  isSaving = false;
  sediul: ISediul | null = null;

  activitatiPrincipalesSharedCollection: IActivitatiPrincipale[] = [];
  activitatiSecundaresSharedCollection: IActivitatiSecundare[] = [];
  srlsSharedCollection: ISrl[] = [];

  editForm: SediulFormGroup = this.sediulFormService.createSediulFormGroup();

  constructor(
    protected sediulService: SediulService,
    protected sediulFormService: SediulFormService,
    protected activitatiPrincipaleService: ActivitatiPrincipaleService,
    protected activitatiSecundareService: ActivitatiSecundareService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareActivitatiPrincipale = (o1: IActivitatiPrincipale | null, o2: IActivitatiPrincipale | null): boolean =>
    this.activitatiPrincipaleService.compareActivitatiPrincipale(o1, o2);

  compareActivitatiSecundare = (o1: IActivitatiSecundare | null, o2: IActivitatiSecundare | null): boolean =>
    this.activitatiSecundareService.compareActivitatiSecundare(o1, o2);

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sediul }) => {
      this.sediul = sediul;
      if (sediul) {
        this.updateForm(sediul);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sediul = this.sediulFormService.getSediul(this.editForm);
    if (sediul.id !== null) {
      this.subscribeToSaveResponse(this.sediulService.update(sediul));
    } else {
      this.subscribeToSaveResponse(this.sediulService.create(sediul));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISediul>>): void {
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

  protected updateForm(sediul: ISediul): void {
    this.sediul = sediul;
    this.sediulFormService.resetForm(this.editForm, sediul);

    this.activitatiPrincipalesSharedCollection =
      this.activitatiPrincipaleService.addActivitatiPrincipaleToCollectionIfMissing<IActivitatiPrincipale>(
        this.activitatiPrincipalesSharedCollection,
        ...(sediul.actprinc1s ?? [])
      );
    this.activitatiSecundaresSharedCollection =
      this.activitatiSecundareService.addActivitatiSecundareToCollectionIfMissing<IActivitatiSecundare>(
        this.activitatiSecundaresSharedCollection,
        ...(sediul.actprinc2s ?? [])
      );
    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, sediul.srl4);
  }

  protected loadRelationshipsOptions(): void {
    this.activitatiPrincipaleService
      .query()
      .pipe(map((res: HttpResponse<IActivitatiPrincipale[]>) => res.body ?? []))
      .pipe(
        map((activitatiPrincipales: IActivitatiPrincipale[]) =>
          this.activitatiPrincipaleService.addActivitatiPrincipaleToCollectionIfMissing<IActivitatiPrincipale>(
            activitatiPrincipales,
            ...(this.sediul?.actprinc1s ?? [])
          )
        )
      )
      .subscribe((activitatiPrincipales: IActivitatiPrincipale[]) => (this.activitatiPrincipalesSharedCollection = activitatiPrincipales));

    this.activitatiSecundareService
      .query()
      .pipe(map((res: HttpResponse<IActivitatiSecundare[]>) => res.body ?? []))
      .pipe(
        map((activitatiSecundares: IActivitatiSecundare[]) =>
          this.activitatiSecundareService.addActivitatiSecundareToCollectionIfMissing<IActivitatiSecundare>(
            activitatiSecundares,
            ...(this.sediul?.actprinc2s ?? [])
          )
        )
      )
      .subscribe((activitatiSecundares: IActivitatiSecundare[]) => (this.activitatiSecundaresSharedCollection = activitatiSecundares));

    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.sediul?.srl4)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
