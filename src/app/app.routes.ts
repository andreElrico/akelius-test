import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'home/language',
    pathMatch: 'full',
    loadComponent: () =>
      import('./language/language.page').then((m) => m.LanguagePage),
  },
  {
    path: 'home/language/:lang',
    pathMatch: 'full',
    loadComponent: () => import('./level/level.page').then((m) => m.LevelPage),
  },
  {
    path: 'home/language/:lang/:level',
    pathMatch: 'full',
    loadComponent: () => import('./step/step.page').then((m) => m.StepPage),
  },
  {
    path: 'home/language/:lang/:level/:step',
    pathMatch: 'full',
    loadComponent: () =>
      import('./slideshow/slideshow.page').then((m) => m.SlideshowPage),
  },
  {
    path: 'home/language/:lang/:level/:step/:slide',
    pathMatch: 'full',
    loadComponent: () =>
      import('./slides/slides.page').then((m) => m.SlidesPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
