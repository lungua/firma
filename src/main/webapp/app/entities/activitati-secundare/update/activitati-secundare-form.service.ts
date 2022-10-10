import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IActivitatiSecundare, NewActivitatiSecundare } from '../activitati-secundare.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IActivitatiSecundare for edit and NewActivitatiSecundareFormGroupInput for create.
 */
type ActivitatiSecundareFormGroupInput = IActivitatiSecundare | PartialWithRequiredKeyOf<NewActivitatiSecundare>;

type ActivitatiSecundareFormDefaults = Pick<NewActivitatiSecundare, 'id' | 'sediulies'>;

type ActivitatiSecundareFormGroupContent = {
  id: FormControl<IActivitatiSecundare['id'] | NewActivitatiSecundare['id']>;
  codCAEN: FormControl<IActivitatiSecundare['codCAEN']>;
  denumirea: FormControl<IActivitatiSecundare['denumirea']>;
  srl5: FormControl<IActivitatiSecundare['srl5']>;
  sediulies: FormControl<IActivitatiSecundare['sediulies']>;
};

export type ActivitatiSecundareFormGroup = FormGroup<ActivitatiSecundareFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ActivitatiSecundareFormService {
  createActivitatiSecundareFormGroup(activitatiSecundare: ActivitatiSecundareFormGroupInput = { id: null }): ActivitatiSecundareFormGroup {
    const activitatiSecundareRawValue = {
      ...this.getFormDefaults(),
      ...activitatiSecundare,
    };
    return new FormGroup<ActivitatiSecundareFormGroupContent>({
      id: new FormControl(
        { value: activitatiSecundareRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codCAEN: new FormControl(activitatiSecundareRawValue.codCAEN),
      denumirea: new FormControl(activitatiSecundareRawValue.denumirea),
      srl5: new FormControl(activitatiSecundareRawValue.srl5),
      sediulies: new FormControl(activitatiSecundareRawValue.sediulies ?? []),
    });
  }

  getActivitatiSecundare(form: ActivitatiSecundareFormGroup): IActivitatiSecundare | NewActivitatiSecundare {
    return form.getRawValue() as IActivitatiSecundare | NewActivitatiSecundare;
  }

  resetForm(form: ActivitatiSecundareFormGroup, activitatiSecundare: ActivitatiSecundareFormGroupInput): void {
    const activitatiSecundareRawValue = { ...this.getFormDefaults(), ...activitatiSecundare };
    form.reset(
      {
        ...activitatiSecundareRawValue,
        id: { value: activitatiSecundareRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ActivitatiSecundareFormDefaults {
    return {
      id: null,
      sediulies: [],
    };
  }
}
