import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
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
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-level',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Choose level</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Choose level</ion-title>
        </ion-toolbar>
      </ion-header>

      <h2 class="ion-padding">
        Level A0: For people who still use Google Translate for 'Yes'.
      </h2>

      @if (levels.error()) {
        <ion-button (click)="levels.reload()" expand="full">
          Reload
        </ion-button>
      }

      <div class="flex-wrapper">
        @for (level of levels.value(); track $index) {
          <ion-button
            class="flex-item"
            [fill]="'outline'"
            [disabled]="level.title !== 'A0'"
            [routerLink]="['./', level.id]"
          >
            {{ level.title }}
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
      position: relative;
    }

    .flex-item:not(:last-child)::after {
      content: '↓'; /* You can use an SVG or Unicode */
      position: absolute;
      bottom: -1em; /* Adjust based on your gap */
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      color: #666;
      pointer-events: none;
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
export class LevelPage implements OnInit, OnDestroy {
  private api = inject(Api);
  private errorToast = inject(ErrorToast);

  levels = this.api.levels;

  constructor() {
    effect(async () => {
      if (this.levels.error()) {
        await this.errorToast.show('Failed to load levels. Please try again.');
      }
    });
  }

  async ngOnInit() {
    // Lock to portrait when entering this page
    try {
      await ScreenOrientation.lock({ orientation: 'portrait' });
    } catch (err) {
      console.log('Orientation lock not supported on this device');
    }
  }

  async ngOnDestroy() {
    // Very important: unlock so the rest of the app can rotate again
    await ScreenOrientation.unlock();
  }
}
