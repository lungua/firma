import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAsocAdmin, NewAsocAdmin } from '../asoc-admin.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAsocAdmin for edit and NewAsocAdminFormGroupInput for create.
 */
type AsocAdminFormGroupInput = IAsocAdmin | PartialWithRequiredKeyOf<NewAsocAdmin>;

type AsocAdminFormDefaults = Pick<NewAsocAdmin, 'id' | 'persoanaFizica' | 'asociat'>;

type AsocAdminFormGroupContent = {
  id: FormControl<IAsocAdmin['id'] | NewAsocAdmin['id']>;
  persoanaFizica: FormControl<IAsocAdmin['persoanaFizica']>;
  asociat: FormControl<IAsocAdmin['asociat']>;
  srl: FormControl<IAsocAdmin['srl']>;
};

export type AsocAdminFormGroup = FormGroup<AsocAdminFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AsocAdminFormService {
  createAsocAdminFormGroup(asocAdmin: AsocAdminFormGroupInput = { id: null }): AsocAdminFormGroup {
    const asocAdminRawValue = {
      ...this.getFormDefaults(),
      ...asocAdmin,
    };
    return new FormGroup<AsocAdminFormGroupContent>({
      id: new FormControl(
        { value: asocAdminRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      persoanaFizica: new FormControl(asocAdminRawValue.persoanaFizica),
      asociat: new FormControl(asocAdminRawValue.asociat),
      srl: new FormControl(asocAdminRawValue.srl),
    });
  }

  getAsocAdmin(form: AsocAdminFormGroup): IAsocAdmin | NewAsocAdmin {
    return form.getRawValue() as IAsocAdmin | NewAsocAdmin;
  }

  resetForm(form: AsocAdminFormGroup, asocAdmin: AsocAdminFormGroupInput): void {
    const asocAdminRawValue = { ...this.getFormDefaults(), ...asocAdmin };
    form.reset(
      {
        ...asocAdminRawValue,
        id: { value: asocAdminRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AsocAdminFormDefaults {
    return {
      id: null,
      persoanaFizica: false,
      asociat: false,
    };
  }
}
