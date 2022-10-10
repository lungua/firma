import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDateSocietate } from '../date-societate.model';

@Component({
  selector: 'jhi-date-societate-detail',
  templateUrl: './date-societate-detail.component.html',
})
export class DateSocietateDetailComponent implements OnInit {
  dateSocietate: IDateSocietate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dateSocietate }) => {
      this.dateSocietate = dateSocietate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
