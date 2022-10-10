import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProprietari } from '../proprietari.model';

@Component({
  selector: 'jhi-proprietari-detail',
  templateUrl: './proprietari-detail.component.html',
})
export class ProprietariDetailComponent implements OnInit {
  proprietari: IProprietari | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proprietari }) => {
      this.proprietari = proprietari;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
