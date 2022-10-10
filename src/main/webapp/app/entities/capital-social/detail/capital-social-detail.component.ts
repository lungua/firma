import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICapitalSocial } from '../capital-social.model';

@Component({
  selector: 'jhi-capital-social-detail',
  templateUrl: './capital-social-detail.component.html',
})
export class CapitalSocialDetailComponent implements OnInit {
  capitalSocial: ICapitalSocial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ capitalSocial }) => {
      this.capitalSocial = capitalSocial;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
