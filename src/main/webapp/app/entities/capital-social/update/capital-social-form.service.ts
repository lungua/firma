import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICapitalSocial, NewCapitalSocial } from '../capital-social.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICapitalSocial for edit and NewCapitalSocialFormGroupInput for create.
 */
type CapitalSocialFormGroupInput = ICapitalSocial | PartialWithRequiredKeyOf<NewCapitalSocial>;

type CapitalSocialFormDefaults = Pick<NewCapitalSocial, 'id'>;

type CapitalSocialFormGroupContent = {
  id: FormControl<ICapitalSocial['id'] | NewCapitalSocial['id']>;
  suma: FormControl<ICapitalSocial['suma']>;
  srl1: FormControl<ICapitalSocial['srl1']>;
};

export type CapitalSocialFormGroup = FormGroup<CapitalSocialFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CapitalSocialFormService {
  createCapitalSocialFormGroup(capitalSocial: CapitalSocialFormGroupInput = { id: null }): CapitalSocialFormGroup {
    const capitalSocialRawValue = {
      ...this.getFormDefaults(),
      ...capitalSocial,
    };
    return new FormGroup<CapitalSocialFormGroupContent>({
      id: new FormControl(
        { value: capitalSocialRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      suma: new FormControl(capitalSocialRawValue.suma),
      srl1: new FormControl(capitalSocialRawValue.srl1),
    });
  }

  getCapitalSocial(form: CapitalSocialFormGroup): ICapitalSocial | NewCapitalSocial {
    return form.getRawValue() as ICapitalSocial | NewCapitalSocial;
  }

  resetForm(form: CapitalSocialFormGroup, capitalSocial: CapitalSocialFormGroupInput): void {
    const capitalSocialRawValue = { ...this.getFormDefaults(), ...capitalSocial };
    form.reset(
      {
        ...capitalSocialRawValue,
        id: { value: capitalSocialRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CapitalSocialFormDefaults {
    return {
      id: null,
    };
  }
}
