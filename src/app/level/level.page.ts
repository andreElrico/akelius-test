import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { Api } from '../services/api';
import { RouterLink } from '@angular/router';
import { ErrorToast } from '../services/error-toast';

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
      height: 100%;
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
export class LevelPage {
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
}
