import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { Api } from '../services/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-language',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title
          >Which language are you ready to get dangerously good at?</ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"
            >Which language are you ready to get dangerously good at?</ion-title
          >
        </ion-toolbar>
      </ion-header>

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
      height: 100%;
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

  languages = this.api.languages;
}
