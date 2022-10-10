import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProprietariFormService, ProprietariFormGroup } from './proprietari-form.service';
import { IProprietari } from '../proprietari.model';
import { ProprietariService } from '../service/proprietari.service';
import { ISediul } from 'app/entities/sediul/sediul.model';
import { SediulService } from 'app/entities/sediul/service/sediul.service';
import { FizicJuridic } from 'app/entities/enumerations/fizic-juridic.model';

@Component({
  selector: 'jhi-proprietari-update',
  templateUrl: './proprietari-update.component.html',
})
export class ProprietariUpdateComponent implements OnInit {
  isSaving = false;
  proprietari: IProprietari | null = null;
  fizicJuridicValues = Object.keys(FizicJuridic);

  sediulsSharedCollection: ISediul[] = [];

  editForm: ProprietariFormGroup = this.proprietariFormService.createProprietariFormGroup();

  constructor(
    protected proprietariService: ProprietariService,
    protected proprietariFormService: ProprietariFormService,
    protected sediulService: SediulService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSediul = (o1: ISediul | null, o2: ISediul | null): boolean => this.sediulService.compareSediul(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proprietari }) => {
      this.proprietari = proprietari;
      if (proprietari) {
        this.updateForm(proprietari);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proprietari = this.proprietariFormService.getProprietari(this.editForm);
    if (proprietari.id !== null) {
      this.subscribeToSaveResponse(this.proprietariService.update(proprietari));
    } else {
      this.subscribeToSaveResponse(this.proprietariService.create(proprietari));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProprietari>>): void {
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

  protected updateForm(proprietari: IProprietari): void {
    this.proprietari = proprietari;
    this.proprietariFormService.resetForm(this.editForm, proprietari);

    this.sediulsSharedCollection = this.sediulService.addSediulToCollectionIfMissing<ISediul>(
      this.sediulsSharedCollection,
      proprietari.sediu3
    );
  }

  protected loadRelationshipsOptions(): void {
    this.sediulService
      .query()
      .pipe(map((res: HttpResponse<ISediul[]>) => res.body ?? []))
      .pipe(map((sediuls: ISediul[]) => this.sediulService.addSediulToCollectionIfMissing<ISediul>(sediuls, this.proprietari?.sediu3)))
      .subscribe((sediuls: ISediul[]) => (this.sediulsSharedCollection = sediuls));
  }
}
