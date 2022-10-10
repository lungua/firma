import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDomiciliul, NewDomiciliul } from '../domiciliul.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDomiciliul for edit and NewDomiciliulFormGroupInput for create.
 */
type DomiciliulFormGroupInput = IDomiciliul | PartialWithRequiredKeyOf<NewDomiciliul>;

type DomiciliulFormDefaults = Pick<NewDomiciliul, 'id'>;

type DomiciliulFormGroupContent = {
  id: FormControl<IDomiciliul['id'] | NewDomiciliul['id']>;
  adresaCI: FormControl<IDomiciliul['adresaCI']>;
  asocadmin3: FormControl<IDomiciliul['asocadmin3']>;
};

export type DomiciliulFormGroup = FormGroup<DomiciliulFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DomiciliulFormService {
  createDomiciliulFormGroup(domiciliul: DomiciliulFormGroupInput = { id: null }): DomiciliulFormGroup {
    const domiciliulRawValue = {
      ...this.getFormDefaults(),
      ...domiciliul,
    };
    return new FormGroup<DomiciliulFormGroupContent>({
      id: new FormControl(
        { value: domiciliulRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      adresaCI: new FormControl(domiciliulRawValue.adresaCI),
      asocadmin3: new FormControl(domiciliulRawValue.asocadmin3),
    });
  }

  getDomiciliul(form: DomiciliulFormGroup): IDomiciliul | NewDomiciliul {
    return form.getRawValue() as IDomiciliul | NewDomiciliul;
  }

  resetForm(form: DomiciliulFormGroup, domiciliul: DomiciliulFormGroupInput): void {
    const domiciliulRawValue = { ...this.getFormDefaults(), ...domiciliul };
    form.reset(
      {
        ...domiciliulRawValue,
        id: { value: domiciliulRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DomiciliulFormDefaults {
    return {
      id: null,
    };
  }
}
