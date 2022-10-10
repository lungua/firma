import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDovada, NewDovada } from '../dovada.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDovada for edit and NewDovadaFormGroupInput for create.
 */
type DovadaFormGroupInput = IDovada | PartialWithRequiredKeyOf<NewDovada>;

type DovadaFormDefaults = Pick<NewDovada, 'id' | 'comodatInchiriere'>;

type DovadaFormGroupContent = {
  id: FormControl<IDovada['id'] | NewDovada['id']>;
  comodatInchiriere: FormControl<IDovada['comodatInchiriere']>;
  durata: FormControl<IDovada['durata']>;
  valoareInchiriere: FormControl<IDovada['valoareInchiriere']>;
  valoareGarantie: FormControl<IDovada['valoareGarantie']>;
  moneda: FormControl<IDovada['moneda']>;
  sediu2: FormControl<IDovada['sediu2']>;
};

export type DovadaFormGroup = FormGroup<DovadaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DovadaFormService {
  createDovadaFormGroup(dovada: DovadaFormGroupInput = { id: null }): DovadaFormGroup {
    const dovadaRawValue = {
      ...this.getFormDefaults(),
      ...dovada,
    };
    return new FormGroup<DovadaFormGroupContent>({
      id: new FormControl(
        { value: dovadaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      comodatInchiriere: new FormControl(dovadaRawValue.comodatInchiriere),
      durata: new FormControl(dovadaRawValue.durata),
      valoareInchiriere: new FormControl(dovadaRawValue.valoareInchiriere),
      valoareGarantie: new FormControl(dovadaRawValue.valoareGarantie),
      moneda: new FormControl(dovadaRawValue.moneda),
      sediu2: new FormControl(dovadaRawValue.sediu2),
    });
  }

  getDovada(form: DovadaFormGroup): IDovada | NewDovada {
    return form.getRawValue() as IDovada | NewDovada;
  }

  resetForm(form: DovadaFormGroup, dovada: DovadaFormGroupInput): void {
    const dovadaRawValue = { ...this.getFormDefaults(), ...dovada };
    form.reset(
      {
        ...dovadaRawValue,
        id: { value: dovadaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DovadaFormDefaults {
    return {
      id: null,
      comodatInchiriere: false,
    };
  }
}
