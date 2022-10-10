import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AdresaFormService, AdresaFormGroup } from './adresa-form.service';
import { IAdresa } from '../adresa.model';
import { AdresaService } from '../service/adresa.service';
import { ISediul } from 'app/entities/sediul/sediul.model';
import { SediulService } from 'app/entities/sediul/service/sediul.service';

@Component({
  selector: 'jhi-adresa-update',
  templateUrl: './adresa-update.component.html',
})
export class AdresaUpdateComponent implements OnInit {
  isSaving = false;
  adresa: IAdresa | null = null;

  sediulsSharedCollection: ISediul[] = [];

  editForm: AdresaFormGroup = this.adresaFormService.createAdresaFormGroup();

  constructor(
    protected adresaService: AdresaService,
    protected adresaFormService: AdresaFormService,
    protected sediulService: SediulService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSediul = (o1: ISediul | null, o2: ISediul | null): boolean => this.sediulService.compareSediul(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adresa }) => {
      this.adresa = adresa;
      if (adresa) {
        this.updateForm(adresa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adresa = this.adresaFormService.getAdresa(this.editForm);
    if (adresa.id !== null) {
      this.subscribeToSaveResponse(this.adresaService.update(adresa));
    } else {
      this.subscribeToSaveResponse(this.adresaService.create(adresa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdresa>>): void {
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

  protected updateForm(adresa: IAdresa): void {
    this.adresa = adresa;
    this.adresaFormService.resetForm(this.editForm, adresa);

    this.sediulsSharedCollection = this.sediulService.addSediulToCollectionIfMissing<ISediul>(this.sediulsSharedCollection, adresa.sediu1);
  }

  protected loadRelationshipsOptions(): void {
    this.sediulService
      .query()
      .pipe(map((res: HttpResponse<ISediul[]>) => res.body ?? []))
      .pipe(map((sediuls: ISediul[]) => this.sediulService.addSediulToCollectionIfMissing<ISediul>(sediuls, this.adresa?.sediu1)))
      .subscribe((sediuls: ISediul[]) => (this.sediulsSharedCollection = sediuls));
  }
}
