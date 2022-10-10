import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISediul, NewSediul } from '../sediul.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISediul for edit and NewSediulFormGroupInput for create.
 */
type SediulFormGroupInput = ISediul | PartialWithRequiredKeyOf<NewSediul>;

type SediulFormDefaults = Pick<NewSediul, 'id' | 'sediusocialPunctLucru' | 'actprinc1s' | 'actprinc2s'>;

type SediulFormGroupContent = {
  id: FormControl<ISediul['id'] | NewSediul['id']>;
  sediusocialPunctLucru: FormControl<ISediul['sediusocialPunctLucru']>;
  actprinc1s: FormControl<ISediul['actprinc1s']>;
  actprinc2s: FormControl<ISediul['actprinc2s']>;
  srl4: FormControl<ISediul['srl4']>;
};

export type SediulFormGroup = FormGroup<SediulFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SediulFormService {
  createSediulFormGroup(sediul: SediulFormGroupInput = { id: null }): SediulFormGroup {
    const sediulRawValue = {
      ...this.getFormDefaults(),
      ...sediul,
    };
    return new FormGroup<SediulFormGroupContent>({
      id: new FormControl(
        { value: sediulRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sediusocialPunctLucru: new FormControl(sediulRawValue.sediusocialPunctLucru),
      actprinc1s: new FormControl(sediulRawValue.actprinc1s ?? []),
      actprinc2s: new FormControl(sediulRawValue.actprinc2s ?? []),
      srl4: new FormControl(sediulRawValue.srl4),
    });
  }

  getSediul(form: SediulFormGroup): ISediul | NewSediul {
    return form.getRawValue() as ISediul | NewSediul;
  }

  resetForm(form: SediulFormGroup, sediul: SediulFormGroupInput): void {
    const sediulRawValue = { ...this.getFormDefaults(), ...sediul };
    form.reset(
      {
        ...sediulRawValue,
        id: { value: sediulRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SediulFormDefaults {
    return {
      id: null,
      sediusocialPunctLucru: false,
      actprinc1s: [],
      actprinc2s: [],
    };
  }
}
