import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
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
  selector: 'app-slideshow',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Choose your lesson</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Choose your lesson</ion-title>
        </ion-toolbar>
      </ion-header>

      <h2 class="ion-padding">
        Flip (left, right) through these lessons like you're looking for your
        lost keys.
      </h2>

      @if (slides.error()) {
        <ion-button (click)="slides.reload()" expand="full">
          Reload
        </ion-button>
      }

      <swiper-container [modules]="swiperModules">
        @for (slide of slides.value()?.slides; track $index) {
          <swiper-slide class="flex-wrapper">
            <h2 class="flex-item">
              Lesson {{ slide.id + 1 }} ({{ slide.template }})
            </h2>

            <ion-button
              class="flex-item"
              [fill]="'outline'"
              [routerLink]="['./', slide.id]"
            >
              Enter lesson
            </ion-button>
          </swiper-slide>
        }
      </swiper-container>
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideshowPage implements OnInit, OnDestroy {
  private api = inject(Api);
  private errorToast = inject(ErrorToast);
  private route = inject(ActivatedRoute);

  slides = this.api.getSlideshows(
    this.route.snapshot.paramMap.get('step') as unknown as number,
  );

  swiperModules = [IonicSlides];

  constructor() {
    effect(async () => {
      if (this.slides.error()) {
        await this.errorToast.show('Failed to load slides. Please try again.');
      }
    });
  }

  async ngOnInit() {
    try {
      // Locks the screen to landscape mode (usually primary)
      await ScreenOrientation.lock({ orientation: 'landscape' });
    } catch (err) {
      // This will trigger on browser/web if not in full-screen
      console.warn('Orientation lock failed:', err);
    }
  }

  async ngOnDestroy() {
    // Returns the app to the user's system settings (auto-rotate)
    try {
      await ScreenOrientation.unlock();
    } catch (err) {
      console.warn('Could not unlock orientation');
    }
  }
}
