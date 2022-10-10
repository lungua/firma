import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISrl } from '../srl.model';

@Component({
  selector: 'jhi-srl-detail',
  templateUrl: './srl-detail.component.html',
})
export class SrlDetailComponent implements OnInit {
  srl: ISrl | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ srl }) => {
      this.srl = srl;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
