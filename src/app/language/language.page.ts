import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { Api } from '../services/api';
import { ErrorToast } from '../services/error-toast';

@Component({
  selector: 'app-language',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Choose your language</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Choose your language</ion-title>
        </ion-toolbar>
      </ion-header>

      <h2 class="ion-padding">
        Which language are you ready to get dangerously good at?
      </h2>

      @if (languages.error()) {
        <ion-button (click)="languages.reload()" expand="full">
          Reload
        </ion-button>
      }

      <div class="flex-wrapper">
        @for (language of languages.value(); track $index) {
          <ion-button
            class="flex-item"
            [fill]="'outline'"
            [disabled]="language.code !== 'en'"
            [routerLink]="['./', language.code]"
          >
            {{ language.name }}
          </ion-button>
        }
      </div>
    </ion-content>`,
  styles: `
    .flex-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 1rem;
    }

    .flex-item {
      width: 100%;
      max-width: 400px;
    }
  `,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    RouterLink,
  ],
})
export class LanguagePage {
  private api = inject(Api);
  private errorToast = inject(ErrorToast);

  languages = this.api.languages;

  constructor() {
    effect(async () => {
      if (this.languages.error()) {
        await this.errorToast.show(
          'Failed to load languages. Please try again.',
        );
      }
    });
  }
}
