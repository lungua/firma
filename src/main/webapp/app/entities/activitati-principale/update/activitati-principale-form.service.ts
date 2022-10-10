import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IActivitatiPrincipale, NewActivitatiPrincipale } from '../activitati-principale.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IActivitatiPrincipale for edit and NewActivitatiPrincipaleFormGroupInput for create.
 */
type ActivitatiPrincipaleFormGroupInput = IActivitatiPrincipale | PartialWithRequiredKeyOf<NewActivitatiPrincipale>;

type ActivitatiPrincipaleFormDefaults = Pick<NewActivitatiPrincipale, 'id' | 'sediulxes'>;

type ActivitatiPrincipaleFormGroupContent = {
  id: FormControl<IActivitatiPrincipale['id'] | NewActivitatiPrincipale['id']>;
  codCAEN: FormControl<IActivitatiPrincipale['codCAEN']>;
  denumirea: FormControl<IActivitatiPrincipale['denumirea']>;
  srl3: FormControl<IActivitatiPrincipale['srl3']>;
  sediulxes: FormControl<IActivitatiPrincipale['sediulxes']>;
};

export type ActivitatiPrincipaleFormGroup = FormGroup<ActivitatiPrincipaleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ActivitatiPrincipaleFormService {
  createActivitatiPrincipaleFormGroup(
    activitatiPrincipale: ActivitatiPrincipaleFormGroupInput = { id: null }
  ): ActivitatiPrincipaleFormGroup {
    const activitatiPrincipaleRawValue = {
      ...this.getFormDefaults(),
      ...activitatiPrincipale,
    };
    return new FormGroup<ActivitatiPrincipaleFormGroupContent>({
      id: new FormControl(
        { value: activitatiPrincipaleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codCAEN: new FormControl(activitatiPrincipaleRawValue.codCAEN),
      denumirea: new FormControl(activitatiPrincipaleRawValue.denumirea),
      srl3: new FormControl(activitatiPrincipaleRawValue.srl3),
      sediulxes: new FormControl(activitatiPrincipaleRawValue.sediulxes ?? []),
    });
  }

  getActivitatiPrincipale(form: ActivitatiPrincipaleFormGroup): IActivitatiPrincipale | NewActivitatiPrincipale {
    return form.getRawValue() as IActivitatiPrincipale | NewActivitatiPrincipale;
  }

  resetForm(form: ActivitatiPrincipaleFormGroup, activitatiPrincipale: ActivitatiPrincipaleFormGroupInput): void {
    const activitatiPrincipaleRawValue = { ...this.getFormDefaults(), ...activitatiPrincipale };
    form.reset(
      {
        ...activitatiPrincipaleRawValue,
        id: { value: activitatiPrincipaleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ActivitatiPrincipaleFormDefaults {
    return {
      id: null,
      sediulxes: [],
    };
  }
}
