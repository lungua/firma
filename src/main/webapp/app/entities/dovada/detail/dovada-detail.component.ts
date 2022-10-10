import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDovada } from '../dovada.model';

@Component({
  selector: 'jhi-dovada-detail',
  templateUrl: './dovada-detail.component.html',
})
export class DovadaDetailComponent implements OnInit {
  dovada: IDovada | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dovada }) => {
      this.dovada = dovada;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
