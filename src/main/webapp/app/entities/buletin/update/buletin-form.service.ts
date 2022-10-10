import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBuletin, NewBuletin } from '../buletin.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBuletin for edit and NewBuletinFormGroupInput for create.
 */
type BuletinFormGroupInput = IBuletin | PartialWithRequiredKeyOf<NewBuletin>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBuletin | NewBuletin> = Omit<T, 'data'> & {
  data?: string | null;
};

type BuletinFormRawValue = FormValueOf<IBuletin>;

type NewBuletinFormRawValue = FormValueOf<NewBuletin>;

type BuletinFormDefaults = Pick<NewBuletin, 'id' | 'data'>;

type BuletinFormGroupContent = {
  id: FormControl<BuletinFormRawValue['id'] | NewBuletin['id']>;
  tip: FormControl<BuletinFormRawValue['tip']>;
  serie: FormControl<BuletinFormRawValue['serie']>;
  numar: FormControl<BuletinFormRawValue['numar']>;
  cnp: FormControl<BuletinFormRawValue['cnp']>;
  tara: FormControl<BuletinFormRawValue['tara']>;
  judet: FormControl<BuletinFormRawValue['judet']>;
  localitate: FormControl<BuletinFormRawValue['localitate']>;
  cetatenie: FormControl<BuletinFormRawValue['cetatenie']>;
  data: FormControl<BuletinFormRawValue['data']>;
  eliberatDe: FormControl<BuletinFormRawValue['eliberatDe']>;
  asocadmin1: FormControl<BuletinFormRawValue['asocadmin1']>;
};

export type BuletinFormGroup = FormGroup<BuletinFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BuletinFormService {
  createBuletinFormGroup(buletin: BuletinFormGroupInput = { id: null }): BuletinFormGroup {
    const buletinRawValue = this.convertBuletinToBuletinRawValue({
      ...this.getFormDefaults(),
      ...buletin,
    });
    return new FormGroup<BuletinFormGroupContent>({
      id: new FormControl(
        { value: buletinRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tip: new FormControl(buletinRawValue.tip),
      serie: new FormControl(buletinRawValue.serie),
      numar: new FormControl(buletinRawValue.numar),
      cnp: new FormControl(buletinRawValue.cnp, {
        validators: [Validators.maxLength(13)],
      }),
      tara: new FormControl(buletinRawValue.tara),
      judet: new FormControl(buletinRawValue.judet),
      localitate: new FormControl(buletinRawValue.localitate),
      cetatenie: new FormControl(buletinRawValue.cetatenie),
      data: new FormControl(buletinRawValue.data),
      eliberatDe: new FormControl(buletinRawValue.eliberatDe),
      asocadmin1: new FormControl(buletinRawValue.asocadmin1),
    });
  }

  getBuletin(form: BuletinFormGroup): IBuletin | NewBuletin {
    return this.convertBuletinRawValueToBuletin(form.getRawValue() as BuletinFormRawValue | NewBuletinFormRawValue);
  }

  resetForm(form: BuletinFormGroup, buletin: BuletinFormGroupInput): void {
    const buletinRawValue = this.convertBuletinToBuletinRawValue({ ...this.getFormDefaults(), ...buletin });
    form.reset(
      {
        ...buletinRawValue,
        id: { value: buletinRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BuletinFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      data: currentTime,
    };
  }

  private convertBuletinRawValueToBuletin(rawBuletin: BuletinFormRawValue | NewBuletinFormRawValue): IBuletin | NewBuletin {
    return {
      ...rawBuletin,
      data: dayjs(rawBuletin.data, DATE_TIME_FORMAT),
    };
  }

  private convertBuletinToBuletinRawValue(
    buletin: IBuletin | (Partial<NewBuletin> & BuletinFormDefaults)
  ): BuletinFormRawValue | PartialWithRequiredKeyOf<NewBuletinFormRawValue> {
    return {
      ...buletin,
      data: buletin.data ? buletin.data.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
