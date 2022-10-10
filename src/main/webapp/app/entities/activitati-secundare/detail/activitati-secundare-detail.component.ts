import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActivitatiSecundare } from '../activitati-secundare.model';

@Component({
  selector: 'jhi-activitati-secundare-detail',
  templateUrl: './activitati-secundare-detail.component.html',
})
export class ActivitatiSecundareDetailComponent implements OnInit {
  activitatiSecundare: IActivitatiSecundare | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activitatiSecundare }) => {
      this.activitatiSecundare = activitatiSecundare;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
