import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDateAsociati, NewDateAsociati } from '../date-asociati.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDateAsociati for edit and NewDateAsociatiFormGroupInput for create.
 */
type DateAsociatiFormGroupInput = IDateAsociati | PartialWithRequiredKeyOf<NewDateAsociati>;

type DateAsociatiFormDefaults = Pick<NewDateAsociati, 'id'>;

type DateAsociatiFormGroupContent = {
  id: FormControl<IDateAsociati['id'] | NewDateAsociati['id']>;
  nume: FormControl<IDateAsociati['nume']>;
  prenume: FormControl<IDateAsociati['prenume']>;
  telefon: FormControl<IDateAsociati['telefon']>;
  asocadmin4: FormControl<IDateAsociati['asocadmin4']>;
};

export type DateAsociatiFormGroup = FormGroup<DateAsociatiFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DateAsociatiFormService {
  createDateAsociatiFormGroup(dateAsociati: DateAsociatiFormGroupInput = { id: null }): DateAsociatiFormGroup {
    const dateAsociatiRawValue = {
      ...this.getFormDefaults(),
      ...dateAsociati,
    };
    return new FormGroup<DateAsociatiFormGroupContent>({
      id: new FormControl(
        { value: dateAsociatiRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nume: new FormControl(dateAsociatiRawValue.nume),
      prenume: new FormControl(dateAsociatiRawValue.prenume),
      telefon: new FormControl(dateAsociatiRawValue.telefon),
      asocadmin4: new FormControl(dateAsociatiRawValue.asocadmin4),
    });
  }

  getDateAsociati(form: DateAsociatiFormGroup): IDateAsociati | NewDateAsociati {
    return form.getRawValue() as IDateAsociati | NewDateAsociati;
  }

  resetForm(form: DateAsociatiFormGroup, dateAsociati: DateAsociatiFormGroupInput): void {
    const dateAsociatiRawValue = { ...this.getFormDefaults(), ...dateAsociati };
    form.reset(
      {
        ...dateAsociatiRawValue,
        id: { value: dateAsociatiRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DateAsociatiFormDefaults {
    return {
      id: null,
    };
  }
}
