import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'srl',
        data: { pageTitle: 'Srls' },
        loadChildren: () => import('./srl/srl.module').then(m => m.SrlModule),
      },
      {
        path: 'suma-incasata',
        data: { pageTitle: 'SumaIncasatas' },
        loadChildren: () => import('./suma-incasata/suma-incasata.module').then(m => m.SumaIncasataModule),
      },
      {
        path: 'asoc-admin',
        data: { pageTitle: 'AsocAdmins' },
        loadChildren: () => import('./asoc-admin/asoc-admin.module').then(m => m.AsocAdminModule),
      },
      {
        path: 'buletin',
        data: { pageTitle: 'Buletins' },
        loadChildren: () => import('./buletin/buletin.module').then(m => m.BuletinModule),
      },
      {
        path: 'date-societate',
        data: { pageTitle: 'DateSocietates' },
        loadChildren: () => import('./date-societate/date-societate.module').then(m => m.DateSocietateModule),
      },
      {
        path: 'domiciliul',
        data: { pageTitle: 'Domiciliuls' },
        loadChildren: () => import('./domiciliul/domiciliul.module').then(m => m.DomiciliulModule),
      },
      {
        path: 'date-asociati',
        data: { pageTitle: 'DateAsociatis' },
        loadChildren: () => import('./date-asociati/date-asociati.module').then(m => m.DateAsociatiModule),
      },
      {
        path: 'capital-social',
        data: { pageTitle: 'CapitalSocials' },
        loadChildren: () => import('./capital-social/capital-social.module').then(m => m.CapitalSocialModule),
      },
      {
        path: 'alte-activitati',
        data: { pageTitle: 'AlteActivitatis' },
        loadChildren: () => import('./alte-activitati/alte-activitati.module').then(m => m.AlteActivitatiModule),
      },
      {
        path: 'activitati-principale',
        data: { pageTitle: 'ActivitatiPrincipales' },
        loadChildren: () => import('./activitati-principale/activitati-principale.module').then(m => m.ActivitatiPrincipaleModule),
      },
      {
        path: 'activitati-secundare',
        data: { pageTitle: 'ActivitatiSecundares' },
        loadChildren: () => import('./activitati-secundare/activitati-secundare.module').then(m => m.ActivitatiSecundareModule),
      },
      {
        path: 'sediul',
        data: { pageTitle: 'Sediuls' },
        loadChildren: () => import('./sediul/sediul.module').then(m => m.SediulModule),
      },
      {
        path: 'adresa',
        data: { pageTitle: 'Adresas' },
        loadChildren: () => import('./adresa/adresa.module').then(m => m.AdresaModule),
      },
      {
        path: 'dovada',
        data: { pageTitle: 'Dovadas' },
        loadChildren: () => import('./dovada/dovada.module').then(m => m.DovadaModule),
      },
      {
        path: 'proprietari',
        data: { pageTitle: 'Proprietaris' },
        loadChildren: () => import('./proprietari/proprietari.module').then(m => m.ProprietariModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
