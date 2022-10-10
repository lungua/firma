import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBuletin } from '../buletin.model';

@Component({
  selector: 'jhi-buletin-detail',
  templateUrl: './buletin-detail.component.html',
})
export class BuletinDetailComponent implements OnInit {
  buletin: IBuletin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ buletin }) => {
      this.buletin = buletin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
