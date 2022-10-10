import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISrl, NewSrl } from '../srl.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISrl for edit and NewSrlFormGroupInput for create.
 */
type SrlFormGroupInput = ISrl | PartialWithRequiredKeyOf<NewSrl>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISrl | NewSrl> = Omit<T, 'dataInregistrare'> & {
  dataInregistrare?: string | null;
};

type SrlFormRawValue = FormValueOf<ISrl>;

type NewSrlFormRawValue = FormValueOf<NewSrl>;

type SrlFormDefaults = Pick<NewSrl, 'id' | 'nuneFinal' | 'dataInregistrare' | 'srlFinalizat'>;

type SrlFormGroupContent = {
  id: FormControl<SrlFormRawValue['id'] | NewSrl['id']>;
  nume1: FormControl<SrlFormRawValue['nume1']>;
  nume2: FormControl<SrlFormRawValue['nume2']>;
  nume3: FormControl<SrlFormRawValue['nume3']>;
  numeSocietate: FormControl<SrlFormRawValue['numeSocietate']>;
  nuneFinal: FormControl<SrlFormRawValue['nuneFinal']>;
  dataInregistrare: FormControl<SrlFormRawValue['dataInregistrare']>;
  telefon: FormControl<SrlFormRawValue['telefon']>;
  email: FormControl<SrlFormRawValue['email']>;
  srlFinalizat: FormControl<SrlFormRawValue['srlFinalizat']>;
  logatCu: FormControl<SrlFormRawValue['logatCu']>;
};

export type SrlFormGroup = FormGroup<SrlFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SrlFormService {
  createSrlFormGroup(srl: SrlFormGroupInput = { id: null }): SrlFormGroup {
    const srlRawValue = this.convertSrlToSrlRawValue({
      ...this.getFormDefaults(),
      ...srl,
    });
    return new FormGroup<SrlFormGroupContent>({
      id: new FormControl(
        { value: srlRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nume1: new FormControl(srlRawValue.nume1),
      nume2: new FormControl(srlRawValue.nume2),
      nume3: new FormControl(srlRawValue.nume3),
      numeSocietate: new FormControl(srlRawValue.numeSocietate),
      nuneFinal: new FormControl(srlRawValue.nuneFinal),
      dataInregistrare: new FormControl(srlRawValue.dataInregistrare),
      telefon: new FormControl(srlRawValue.telefon),
      email: new FormControl(srlRawValue.email, {
        validators: [Validators.maxLength(254)],
      }),
      srlFinalizat: new FormControl(srlRawValue.srlFinalizat),
      logatCu: new FormControl(srlRawValue.logatCu),
    });
  }

  getSrl(form: SrlFormGroup): ISrl | NewSrl {
    return this.convertSrlRawValueToSrl(form.getRawValue() as SrlFormRawValue | NewSrlFormRawValue);
  }

  resetForm(form: SrlFormGroup, srl: SrlFormGroupInput): void {
    const srlRawValue = this.convertSrlToSrlRawValue({ ...this.getFormDefaults(), ...srl });
    form.reset(
      {
        ...srlRawValue,
        id: { value: srlRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SrlFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      nuneFinal: false,
      dataInregistrare: currentTime,
      srlFinalizat: false,
    };
  }

  private convertSrlRawValueToSrl(rawSrl: SrlFormRawValue | NewSrlFormRawValue): ISrl | NewSrl {
    return {
      ...rawSrl,
      dataInregistrare: dayjs(rawSrl.dataInregistrare, DATE_TIME_FORMAT),
    };
  }

  private convertSrlToSrlRawValue(
    srl: ISrl | (Partial<NewSrl> & SrlFormDefaults)
  ): SrlFormRawValue | PartialWithRequiredKeyOf<NewSrlFormRawValue> {
    return {
      ...srl,
      dataInregistrare: srl.dataInregistrare ? srl.dataInregistrare.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
