import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CapitalSocialFormService, CapitalSocialFormGroup } from './capital-social-form.service';
import { ICapitalSocial } from '../capital-social.model';
import { CapitalSocialService } from '../service/capital-social.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

@Component({
  selector: 'jhi-capital-social-update',
  templateUrl: './capital-social-update.component.html',
})
export class CapitalSocialUpdateComponent implements OnInit {
  isSaving = false;
  capitalSocial: ICapitalSocial | null = null;

  srlsSharedCollection: ISrl[] = [];

  editForm: CapitalSocialFormGroup = this.capitalSocialFormService.createCapitalSocialFormGroup();

  constructor(
    protected capitalSocialService: CapitalSocialService,
    protected capitalSocialFormService: CapitalSocialFormService,
    protected srlService: SrlService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSrl = (o1: ISrl | null, o2: ISrl | null): boolean => this.srlService.compareSrl(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ capitalSocial }) => {
      this.capitalSocial = capitalSocial;
      if (capitalSocial) {
        this.updateForm(capitalSocial);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const capitalSocial = this.capitalSocialFormService.getCapitalSocial(this.editForm);
    if (capitalSocial.id !== null) {
      this.subscribeToSaveResponse(this.capitalSocialService.update(capitalSocial));
    } else {
      this.subscribeToSaveResponse(this.capitalSocialService.create(capitalSocial));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICapitalSocial>>): void {
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

  protected updateForm(capitalSocial: ICapitalSocial): void {
    this.capitalSocial = capitalSocial;
    this.capitalSocialFormService.resetForm(this.editForm, capitalSocial);

    this.srlsSharedCollection = this.srlService.addSrlToCollectionIfMissing<ISrl>(this.srlsSharedCollection, capitalSocial.srl1);
  }

  protected loadRelationshipsOptions(): void {
    this.srlService
      .query()
      .pipe(map((res: HttpResponse<ISrl[]>) => res.body ?? []))
      .pipe(map((srls: ISrl[]) => this.srlService.addSrlToCollectionIfMissing<ISrl>(srls, this.capitalSocial?.srl1)))
      .subscribe((srls: ISrl[]) => (this.srlsSharedCollection = srls));
  }
}
