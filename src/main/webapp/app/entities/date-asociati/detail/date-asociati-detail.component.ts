import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDateAsociati } from '../date-asociati.model';

@Component({
  selector: 'jhi-date-asociati-detail',
  templateUrl: './date-asociati-detail.component.html',
})
export class DateAsociatiDetailComponent implements OnInit {
  dateAsociati: IDateAsociati | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dateAsociati }) => {
      this.dateAsociati = dateAsociati;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
