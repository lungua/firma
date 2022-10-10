import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDateSocietate, NewDateSocietate } from '../date-societate.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDateSocietate for edit and NewDateSocietateFormGroupInput for create.
 */
type DateSocietateFormGroupInput = IDateSocietate | PartialWithRequiredKeyOf<NewDateSocietate>;

type DateSocietateFormDefaults = Pick<NewDateSocietate, 'id'>;

type DateSocietateFormGroupContent = {
  id: FormControl<IDateSocietate['id'] | NewDateSocietate['id']>;
  denumire: FormControl<IDateSocietate['denumire']>;
  cui: FormControl<IDateSocietate['cui']>;
  regComert: FormControl<IDateSocietate['regComert']>;
  adresaSediu: FormControl<IDateSocietate['adresaSediu']>;
  asocadmin2: FormControl<IDateSocietate['asocadmin2']>;
};

export type DateSocietateFormGroup = FormGroup<DateSocietateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DateSocietateFormService {
  createDateSocietateFormGroup(dateSocietate: DateSocietateFormGroupInput = { id: null }): DateSocietateFormGroup {
    const dateSocietateRawValue = {
      ...this.getFormDefaults(),
      ...dateSocietate,
    };
    return new FormGroup<DateSocietateFormGroupContent>({
      id: new FormControl(
        { value: dateSocietateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      denumire: new FormControl(dateSocietateRawValue.denumire),
      cui: new FormControl(dateSocietateRawValue.cui),
      regComert: new FormControl(dateSocietateRawValue.regComert),
      adresaSediu: new FormControl(dateSocietateRawValue.adresaSediu),
      asocadmin2: new FormControl(dateSocietateRawValue.asocadmin2),
    });
  }

  getDateSocietate(form: DateSocietateFormGroup): IDateSocietate | NewDateSocietate {
    return form.getRawValue() as IDateSocietate | NewDateSocietate;
  }

  resetForm(form: DateSocietateFormGroup, dateSocietate: DateSocietateFormGroupInput): void {
    const dateSocietateRawValue = { ...this.getFormDefaults(), ...dateSocietate };
    form.reset(
      {
        ...dateSocietateRawValue,
        id: { value: dateSocietateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DateSocietateFormDefaults {
    return {
      id: null,
    };
  }
}
