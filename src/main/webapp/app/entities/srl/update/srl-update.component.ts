import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SrlFormService, SrlFormGroup } from './srl-form.service';
import { ISrl } from '../srl.model';
import { SrlService } from '../service/srl.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-srl-update',
  templateUrl: './srl-update.component.html',
})
export class SrlUpdateComponent implements OnInit {
  isSaving = false;
  srl: ISrl | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: SrlFormGroup = this.srlFormService.createSrlFormGroup();

  constructor(
    protected srlService: SrlService,
    protected srlFormService: SrlFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ srl }) => {
      this.srl = srl;
      if (srl) {
        this.updateForm(srl);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const srl = this.srlFormService.getSrl(this.editForm);
    if (srl.id !== null) {
      this.subscribeToSaveResponse(this.srlService.update(srl));
    } else {
      this.subscribeToSaveResponse(this.srlService.create(srl));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISrl>>): void {
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

  protected updateForm(srl: ISrl): void {
    this.srl = srl;
    this.srlFormService.resetForm(this.editForm, srl);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, srl.inregistratDe);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.srl?.inregistratDe)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
