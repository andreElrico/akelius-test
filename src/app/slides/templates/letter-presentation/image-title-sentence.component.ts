import { Component, input, signal, effect, untracked } from '@angular/core';
import { SlideTemplate } from '../../model';
import { ImageTitleSentence } from 'src/app/services/api.model'; // Assuming this exists
import { IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  playOutline,
  refreshOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import { goToNextSlide } from '../../helper';

@Component({
  selector: 'app-image-title-sentence',
  standalone: true,
  imports: [IonButton, IonIcon, IonImg],
  template: `
    <div
      class="presentation-container ion-padding"
      [style.backgroundColor]="dataIn().backgroundColor"
    >
      <div class="audio-controls">
        <ion-button fill="clear" (click)="playAudio()">
          <ion-icon
            slot="start"
            [name]="isPlaying() ? 'play-outline' : 'refresh-outline'"
          ></ion-icon>
          Listen
        </ion-button>
      </div>

      <div class="content-stage">
        @if (dataIn().images && dataIn().images.length > 0) {
          <div class="image-wrapper" [class.fade-in]="dataIn().isAnimated">
            <ion-img
              [src]="dataIn().images[0].url"
              [alt]="dataIn().text"
            ></ion-img>
          </div>
        }

        <h1 class="title-text">{{ dataIn().text }}</h1>
      </div>

      <div class="footer-actions">
        <ion-button
          expand="block"
          fill="solid"
          color="primary"
          (click)="next()"
        >
          Continue
          <ion-icon slot="end" name="arrow-forward-outline"></ion-icon>
        </ion-button>
      </div>
    </div>
  `,
  styles: `
    .presentation-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .content-stage {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
    .image-wrapper {
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    .title-text {
      font-size: 3rem;
      margin: 0;
      font-weight: 600;
      color: var(--ion-color-dark);
      text-transform: capitalize;
    }
    .footer-actions {
      width: 100%;
      padding-bottom: 20px;
    }
    ion-img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  `,
})
export class ImageTitleSentenceComponent implements SlideTemplate<ImageTitleSentence> {
  dataIn = input({} as ImageTitleSentence);

  isPlaying = signal(false);
  private audio = new Audio();
  private goToNextSlide = goToNextSlide();

  constructor() {
    addIcons({ playOutline, refreshOutline, arrowForwardOutline });

    // Auto-play logic using effect
    effect(() => {
      const url = this.dataIn().audioUrl;
      if (url) {
        untracked(() => this.playAudio());
      }
    });
  }

  async playAudio() {
    try {
      this.audio.src = this.dataIn().audioUrl;
      this.isPlaying.set(true);
      await this.audio.play();
      this.audio.onended = () => this.isPlaying.set(false);
    } catch (err) {
      console.warn('Autoplay blocked: Interaction required', err);
      this.isPlaying.set(false);
    }
  }

  next() {
    this.goToNextSlide(this.dataIn().id);
  }
}
