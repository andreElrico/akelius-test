import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { ErrorToast } from '../services/error-toast';

@Component({
  selector: 'app-step',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Choose your step</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Choose your step</ion-title>
        </ion-toolbar>
      </ion-header>
      <h2 class="ion-padding">
        Start like the guy who forgot his pants, but end like the guy who owns
        the pants factory.
      </h2>

      @if (steps.error()) {
        <ion-button (click)="steps.reload()" expand="full"> Reload </ion-button>
      }

      <div class="flex-wrapper">
        @for (step of steps.value()?.steps; track $index) {
          <ion-button
            class="flex-item"
            [fill]="'outline'"
            [disabled]="step.title !== '1'"
            [routerLink]="['./', step.slideshowId]"
          >
            {{ step.title }}
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
export class StepPage {
  private api = inject(Api);
  private errorToast = inject(ErrorToast);
  private route = inject(ActivatedRoute);

  steps = this.api.getSteps(
    this.route.snapshot.paramMap.get('level') as unknown as number,
  );

  constructor() {
    effect(async () => {
      if (this.steps.error()) {
        await this.errorToast.show('Failed to load steps. Please try again.');
      }
    });
  }
}
