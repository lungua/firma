import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DovadaFormService, DovadaFormGroup } from './dovada-form.service';
import { IDovada } from '../dovada.model';
import { DovadaService } from '../service/dovada.service';
import { ISediul } from 'app/entities/sediul/sediul.model';
import { SediulService } from 'app/entities/sediul/service/sediul.service';
import { Moneda } from 'app/entities/enumerations/moneda.model';

@Component({
  selector: 'jhi-dovada-update',
  templateUrl: './dovada-update.component.html',
})
export class DovadaUpdateComponent implements OnInit {
  isSaving = false;
  dovada: IDovada | null = null;
  monedaValues = Object.keys(Moneda);

  sediulsSharedCollection: ISediul[] = [];

  editForm: DovadaFormGroup = this.dovadaFormService.createDovadaFormGroup();

  constructor(
    protected dovadaService: DovadaService,
    protected dovadaFormService: DovadaFormService,
    protected sediulService: SediulService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSediul = (o1: ISediul | null, o2: ISediul | null): boolean => this.sediulService.compareSediul(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dovada }) => {
      this.dovada = dovada;
      if (dovada) {
        this.updateForm(dovada);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dovada = this.dovadaFormService.getDovada(this.editForm);
    if (dovada.id !== null) {
      this.subscribeToSaveResponse(this.dovadaService.update(dovada));
    } else {
      this.subscribeToSaveResponse(this.dovadaService.create(dovada));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDovada>>): void {
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

  protected updateForm(dovada: IDovada): void {
    this.dovada = dovada;
    this.dovadaFormService.resetForm(this.editForm, dovada);

    this.sediulsSharedCollection = this.sediulService.addSediulToCollectionIfMissing<ISediul>(this.sediulsSharedCollection, dovada.sediu2);
  }

  protected loadRelationshipsOptions(): void {
    this.sediulService
      .query()
      .pipe(map((res: HttpResponse<ISediul[]>) => res.body ?? []))
      .pipe(map((sediuls: ISediul[]) => this.sediulService.addSediulToCollectionIfMissing<ISediul>(sediuls, this.dovada?.sediu2)))
      .subscribe((sediuls: ISediul[]) => (this.sediulsSharedCollection = sediuls));
  }
}
