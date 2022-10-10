import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProprietari, NewProprietari } from '../proprietari.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProprietari for edit and NewProprietariFormGroupInput for create.
 */
type ProprietariFormGroupInput = IProprietari | PartialWithRequiredKeyOf<NewProprietari>;

type ProprietariFormDefaults = Pick<NewProprietari, 'id'>;

type ProprietariFormGroupContent = {
  id: FormControl<IProprietari['id'] | NewProprietari['id']>;
  fizicJuridic: FormControl<IProprietari['fizicJuridic']>;
  nume: FormControl<IProprietari['nume']>;
  prenume: FormControl<IProprietari['prenume']>;
  tip: FormControl<IProprietari['tip']>;
  serie: FormControl<IProprietari['serie']>;
  numar: FormControl<IProprietari['numar']>;
  cui: FormControl<IProprietari['cui']>;
  denumireSocietate: FormControl<IProprietari['denumireSocietate']>;
  sediu3: FormControl<IProprietari['sediu3']>;
};

export type ProprietariFormGroup = FormGroup<ProprietariFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProprietariFormService {
  createProprietariFormGroup(proprietari: ProprietariFormGroupInput = { id: null }): ProprietariFormGroup {
    const proprietariRawValue = {
      ...this.getFormDefaults(),
      ...proprietari,
    };
    return new FormGroup<ProprietariFormGroupContent>({
      id: new FormControl(
        { value: proprietariRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fizicJuridic: new FormControl(proprietariRawValue.fizicJuridic),
      nume: new FormControl(proprietariRawValue.nume),
      prenume: new FormControl(proprietariRawValue.prenume),
      tip: new FormControl(proprietariRawValue.tip),
      serie: new FormControl(proprietariRawValue.serie),
      numar: new FormControl(proprietariRawValue.numar),
      cui: new FormControl(proprietariRawValue.cui),
      denumireSocietate: new FormControl(proprietariRawValue.denumireSocietate),
      sediu3: new FormControl(proprietariRawValue.sediu3),
    });
  }

  getProprietari(form: ProprietariFormGroup): IProprietari | NewProprietari {
    return form.getRawValue() as IProprietari | NewProprietari;
  }

  resetForm(form: ProprietariFormGroup, proprietari: ProprietariFormGroupInput): void {
    const proprietariRawValue = { ...this.getFormDefaults(), ...proprietari };
    form.reset(
      {
        ...proprietariRawValue,
        id: { value: proprietariRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProprietariFormDefaults {
    return {
      id: null,
    };
  }
}
