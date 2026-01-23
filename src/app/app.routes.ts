import { Route, Routes } from '@angular/router';

const language: Route = {
  path: ':lang',
  loadComponent: () =>
    import('./language/language.page').then((m) => m.LanguagePage),
};

const level: Route = {
  path: ':level',
  loadComponent: () => import('./level/level.page').then((m) => m.LevelPage),
};

const step: Route = {
  path: ':step',
  loadComponent: () => import('./step/step.page').then((m) => m.StepPage),
};

const lesson: Route = {
  path: ':lesson',
  loadComponent: () =>
    import('./slideshow/slideshow.page').then((m) => m.SlideshowPage),
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    children: [
      {
        ...language,
        children: [
          {
            ...level,
            children: [
              {
                ...step,
                children: [
                  {
                    ...lesson,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
