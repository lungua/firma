import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlteActivitati, NewAlteActivitati } from '../alte-activitati.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlteActivitati for edit and NewAlteActivitatiFormGroupInput for create.
 */
type AlteActivitatiFormGroupInput = IAlteActivitati | PartialWithRequiredKeyOf<NewAlteActivitati>;

type AlteActivitatiFormDefaults = Pick<NewAlteActivitati, 'id'>;

type AlteActivitatiFormGroupContent = {
  id: FormControl<IAlteActivitati['id'] | NewAlteActivitati['id']>;
  codCAEN: FormControl<IAlteActivitati['codCAEN']>;
  denumirea: FormControl<IAlteActivitati['denumirea']>;
  srl2: FormControl<IAlteActivitati['srl2']>;
};

export type AlteActivitatiFormGroup = FormGroup<AlteActivitatiFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlteActivitatiFormService {
  createAlteActivitatiFormGroup(alteActivitati: AlteActivitatiFormGroupInput = { id: null }): AlteActivitatiFormGroup {
    const alteActivitatiRawValue = {
      ...this.getFormDefaults(),
      ...alteActivitati,
    };
    return new FormGroup<AlteActivitatiFormGroupContent>({
      id: new FormControl(
        { value: alteActivitatiRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codCAEN: new FormControl(alteActivitatiRawValue.codCAEN),
      denumirea: new FormControl(alteActivitatiRawValue.denumirea),
      srl2: new FormControl(alteActivitatiRawValue.srl2),
    });
  }

  getAlteActivitati(form: AlteActivitatiFormGroup): IAlteActivitati | NewAlteActivitati {
    return form.getRawValue() as IAlteActivitati | NewAlteActivitati;
  }

  resetForm(form: AlteActivitatiFormGroup, alteActivitati: AlteActivitatiFormGroupInput): void {
    const alteActivitatiRawValue = { ...this.getFormDefaults(), ...alteActivitati };
    form.reset(
      {
        ...alteActivitatiRawValue,
        id: { value: alteActivitatiRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlteActivitatiFormDefaults {
    return {
      id: null,
    };
  }
}
