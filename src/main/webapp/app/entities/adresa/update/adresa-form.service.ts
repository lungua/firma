import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAdresa, NewAdresa } from '../adresa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAdresa for edit and NewAdresaFormGroupInput for create.
 */
type AdresaFormGroupInput = IAdresa | PartialWithRequiredKeyOf<NewAdresa>;

type AdresaFormDefaults = Pick<NewAdresa, 'id' | 'asociatieLocatari'>;

type AdresaFormGroupContent = {
  id: FormControl<IAdresa['id'] | NewAdresa['id']>;
  strada: FormControl<IAdresa['strada']>;
  numarul: FormControl<IAdresa['numarul']>;
  localitatea: FormControl<IAdresa['localitatea']>;
  judetul: FormControl<IAdresa['judetul']>;
  bloc: FormControl<IAdresa['bloc']>;
  scara: FormControl<IAdresa['scara']>;
  etaj: FormControl<IAdresa['etaj']>;
  apartament: FormControl<IAdresa['apartament']>;
  alteDetalii: FormControl<IAdresa['alteDetalii']>;
  asociatieLocatari: FormControl<IAdresa['asociatieLocatari']>;
  sediu1: FormControl<IAdresa['sediu1']>;
};

export type AdresaFormGroup = FormGroup<AdresaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AdresaFormService {
  createAdresaFormGroup(adresa: AdresaFormGroupInput = { id: null }): AdresaFormGroup {
    const adresaRawValue = {
      ...this.getFormDefaults(),
      ...adresa,
    };
    return new FormGroup<AdresaFormGroupContent>({
      id: new FormControl(
        { value: adresaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      strada: new FormControl(adresaRawValue.strada),
      numarul: new FormControl(adresaRawValue.numarul),
      localitatea: new FormControl(adresaRawValue.localitatea),
      judetul: new FormControl(adresaRawValue.judetul),
      bloc: new FormControl(adresaRawValue.bloc),
      scara: new FormControl(adresaRawValue.scara),
      etaj: new FormControl(adresaRawValue.etaj),
      apartament: new FormControl(adresaRawValue.apartament),
      alteDetalii: new FormControl(adresaRawValue.alteDetalii),
      asociatieLocatari: new FormControl(adresaRawValue.asociatieLocatari),
      sediu1: new FormControl(adresaRawValue.sediu1),
    });
  }

  getAdresa(form: AdresaFormGroup): IAdresa | NewAdresa {
    return form.getRawValue() as IAdresa | NewAdresa;
  }

  resetForm(form: AdresaFormGroup, adresa: AdresaFormGroupInput): void {
    const adresaRawValue = { ...this.getFormDefaults(), ...adresa };
    form.reset(
      {
        ...adresaRawValue,
        id: { value: adresaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AdresaFormDefaults {
    return {
      id: null,
      asociatieLocatari: false,
    };
  }
}
