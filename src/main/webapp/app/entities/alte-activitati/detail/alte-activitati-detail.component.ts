import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlteActivitati } from '../alte-activitati.model';

@Component({
  selector: 'jhi-alte-activitati-detail',
  templateUrl: './alte-activitati-detail.component.html',
})
export class AlteActivitatiDetailComponent implements OnInit {
  alteActivitati: IAlteActivitati | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alteActivitati }) => {
      this.alteActivitati = alteActivitati;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
