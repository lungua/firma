import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISumaIncasata, NewSumaIncasata } from '../suma-incasata.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISumaIncasata for edit and NewSumaIncasataFormGroupInput for create.
 */
type SumaIncasataFormGroupInput = ISumaIncasata | PartialWithRequiredKeyOf<NewSumaIncasata>;

type SumaIncasataFormDefaults = Pick<NewSumaIncasata, 'id'>;

type SumaIncasataFormGroupContent = {
  id: FormControl<ISumaIncasata['id'] | NewSumaIncasata['id']>;
  sumaIncasata: FormControl<ISumaIncasata['sumaIncasata']>;
  dataIncasarii: FormControl<ISumaIncasata['dataIncasarii']>;
  srl5: FormControl<ISumaIncasata['srl5']>;
};

export type SumaIncasataFormGroup = FormGroup<SumaIncasataFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SumaIncasataFormService {
  createSumaIncasataFormGroup(sumaIncasata: SumaIncasataFormGroupInput = { id: null }): SumaIncasataFormGroup {
    const sumaIncasataRawValue = {
      ...this.getFormDefaults(),
      ...sumaIncasata,
    };
    return new FormGroup<SumaIncasataFormGroupContent>({
      id: new FormControl(
        { value: sumaIncasataRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sumaIncasata: new FormControl(sumaIncasataRawValue.sumaIncasata),
      dataIncasarii: new FormControl(sumaIncasataRawValue.dataIncasarii),
      srl5: new FormControl(sumaIncasataRawValue.srl5),
    });
  }

  getSumaIncasata(form: SumaIncasataFormGroup): ISumaIncasata | NewSumaIncasata {
    return form.getRawValue() as ISumaIncasata | NewSumaIncasata;
  }

  resetForm(form: SumaIncasataFormGroup, sumaIncasata: SumaIncasataFormGroupInput): void {
    const sumaIncasataRawValue = { ...this.getFormDefaults(), ...sumaIncasata };
    form.reset(
      {
        ...sumaIncasataRawValue,
        id: { value: sumaIncasataRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SumaIncasataFormDefaults {
    return {
      id: null,
    };
  }
}
