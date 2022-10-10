import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDomiciliul } from '../domiciliul.model';

@Component({
  selector: 'jhi-domiciliul-detail',
  templateUrl: './domiciliul-detail.component.html',
})
export class DomiciliulDetailComponent implements OnInit {
  domiciliul: IDomiciliul | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ domiciliul }) => {
      this.domiciliul = domiciliul;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
