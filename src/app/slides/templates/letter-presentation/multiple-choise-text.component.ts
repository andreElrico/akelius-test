import { Component, inject, input, OnInit, signal } from '@angular/core';
import { SlideTemplate } from '../../model';
import { MultipleChoiceText } from 'src/app/services/api.model';
import {
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  playOutline,
  refreshOutline,
  checkmarkCircle,
  closeCircle,
} from 'ionicons/icons';
import { goToNextSlide } from '../../helper';

@Component({
  selector: 'app-multiple-choice-text',
  standalone: true,
  template: `<div class="ion-padding">
    <ion-button fill="clear" (click)="playAudio()">
      <ion-icon
        slot="start"
        [name]="isPlaying() ? 'play-outline' : 'refresh-outline'"
      ></ion-icon>
      Replay Audio
    </ion-button>

    <ion-list>
      @for (option of dataIn().textOptions; track option.id) {
        <ion-item button (click)="selectOption(option)">
          <ion-label>{{ option.text }}</ion-label>

          @if (selectedId() === option.id) {
            <ion-chip [color]="option.expectedSelection ? 'success' : 'danger'">
              <ion-icon
                [name]="
                  option.expectedSelection ? 'checkmark-circle' : 'close-circle'
                "
              ></ion-icon>
              <ion-label>{{
                option.expectedSelection ? 'Correct!' : 'Wrong'
              }}</ion-label>
            </ion-chip>
          }
        </ion-item>
      }
    </ion-list>
  </div>`,
  styles: ``,
  imports: [IonButton, IonIcon, IonChip, IonLabel, IonList, IonItem],
})
export class MultipleChoiceTextComponent implements SlideTemplate<MultipleChoiceText> {
  dataIn = input({} as MultipleChoiceText);

  // Local state signals
  selectedId = signal<number | null>(null);
  isPlaying = signal(false);
  private audio = new Audio();
  private goToNextSlide = goToNextSlide();

  constructor() {
    addIcons({ playOutline, refreshOutline, checkmarkCircle, closeCircle });

    // Todo: Is there a better and more robust way to auto-play on component load?
    setTimeout(() => this.playAudio(), 300);
  }

  async playAudio() {
    this.audio.src = this.dataIn().audioUrl;
    this.audio.load();
    this.isPlaying.set(true);
    await this.audio.play();
    this.audio.onended = () => this.isPlaying.set(false);
  }

  selectOption(option: MultipleChoiceText['textOptions'][0]) {
    this.selectedId.set(option.id);

    if (option.expectedSelection) {
      // Todo: make output and let Slides.page handle navigation.
      this.goToNextSlide(this.dataIn().id);
    }
  }
}
