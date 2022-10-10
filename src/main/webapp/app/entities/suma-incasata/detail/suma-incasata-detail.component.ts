import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISumaIncasata } from '../suma-incasata.model';

@Component({
  selector: 'jhi-suma-incasata-detail',
  templateUrl: './suma-incasata-detail.component.html',
})
export class SumaIncasataDetailComponent implements OnInit {
  sumaIncasata: ISumaIncasata | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sumaIncasata }) => {
      this.sumaIncasata = sumaIncasata;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
