import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsocAdmin } from '../asoc-admin.model';

@Component({
  selector: 'jhi-asoc-admin-detail',
  templateUrl: './asoc-admin-detail.component.html',
})
export class AsocAdminDetailComponent implements OnInit {
  asocAdmin: IAsocAdmin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asocAdmin }) => {
      this.asocAdmin = asocAdmin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
