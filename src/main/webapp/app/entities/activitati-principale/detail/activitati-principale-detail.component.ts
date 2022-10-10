import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActivitatiPrincipale } from '../activitati-principale.model';

@Component({
  selector: 'jhi-activitati-principale-detail',
  templateUrl: './activitati-principale-detail.component.html',
})
export class ActivitatiPrincipaleDetailComponent implements OnInit {
  activitatiPrincipale: IActivitatiPrincipale | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activitatiPrincipale }) => {
      this.activitatiPrincipale = activitatiPrincipale;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
