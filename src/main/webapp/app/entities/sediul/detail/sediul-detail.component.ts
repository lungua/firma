import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISediul } from '../sediul.model';

@Component({
  selector: 'jhi-sediul-detail',
  templateUrl: './sediul-detail.component.html',
})
export class SediulDetailComponent implements OnInit {
  sediul: ISediul | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sediul }) => {
      this.sediul = sediul;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
