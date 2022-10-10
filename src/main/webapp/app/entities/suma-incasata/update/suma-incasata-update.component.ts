import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SumaIncasataFormService, SumaIncasataFormGroup } from './suma-incasata-form.service';
import { ISumaIncasata } from '../suma-incasata.model';
import { SumaIncasataService } from '../service/suma-incasata.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-suma-incasata-update',
  templateUrl: './suma-incasata-update.component.html',
})
export class SumaIncasataUpdateComponent implements OnInit {
  isSaving = false;
  sumaIncasata: ISumaIncasata | null = null;

  srlsSharedCollection: ISrl[] = [];

  editForm: SumaIncasataFormGroup = this.sumaIncasataFormService.createSumaIncasataFormGroup();

  constructor(
    protected sumaIncasataService: SumaIncasataService,
    protected sumaIncasataFormService: SumaIncasataFormService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sumaIncasata }) => {
      this.sumaIncasata = sumaIncasata;
      if (sumaIncasata) {
        this.updateForm(sumaIncasata);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sumaIncasata = this.sumaIncasataFormService.getSumaIncasata(this.editForm);
    if (sumaIncasata.id !== null) {
      this.subscribeToSaveResponse(this.sumaIncasataService.update(sumaIncasata));
    } else {
      this.subscribeToSaveResponse(this.sumaIncasataService.create(sumaIncasata));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISumaIncasata>>): void {
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

  protected updateForm(sumaIncasata: ISumaIncasata): void {
    this.sumaIncasata = sumaIncasata;
    this.sumaIncasataFormService.resetForm(this.editForm, sumaIncasata);

    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, sumaIncasata.srl5);
  }

  protected loadRelationshipsOptions(): void {
    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.sumaIncasata?.srl5)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
