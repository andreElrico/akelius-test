import { Component, effect, input, signal, untracked } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  playOutline,
  refreshOutline,
} from 'ionicons/icons';
import { LetterPresentation } from 'src/app/services/api.model'; // Assuming this exists

import { goToNextSlide } from '../../helper';
import { SlideTemplate } from '../../model';

@Component({
  selector: 'app-letter-presentation',
  standalone: true,
  imports: [IonButton, IonIcon],
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

      <div class="letter-stage">
        <h1 [class.zoom-animation]="dataIn().isAnimated" class="display-letter">
          {{ dataIn().text }}
        </h1>
      </div>

      <div class="footer-actions">
        <ion-button expand="block" fill="outline" (click)="next()">
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
    .letter-stage {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .display-letter {
      font-size: 15rem;
      margin: 0;
      font-weight: bold;
      color: var(--ion-color-primary, #3880ff);
    }
    .zoom-animation {
      animation: zoomIn 1.5s ease-out forwards;
    }
    @keyframes zoomIn {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .footer-actions {
      width: 100%;
      padding-bottom: 20px;
    }
  `,
})
export class LetterPresentationComponent implements SlideTemplate<LetterPresentation> {
  dataIn = input({} as LetterPresentation);

  isPlaying = signal(false);
  private audio = new Audio();
  private goToNextSlide = goToNextSlide();

  constructor() {
    addIcons({ playOutline, refreshOutline, arrowForwardOutline });

    // Robust Auto-play: Trigger when input is available
    effect(() => {
      const url = this.dataIn().audioUrl;
      // We use untracked to avoid potential circular dependencies
      untracked(() => {
        if (url) {
          this.playAudio();
        }
      });
    });
  }

  // TODO make audio service or something
  async playAudio() {
    try {
      this.audio.src = this.dataIn().audioUrl;
      this.audio.load();
      this.isPlaying.set(true);
      await this.audio.play();
      this.audio.onended = () => this.isPlaying.set(false);
    } catch (err) {
      // Browser usually blocks autoplay unless user clicked something before this slide
      console.warn('Autoplay blocked', err);
      this.isPlaying.set(false);
    }
  }

  next() {
    this.goToNextSlide(this.dataIn().id);
  }
}
