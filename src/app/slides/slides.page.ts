import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { Api } from '../services/api';
import { ErrorToast } from '../services/error-toast';

import { stringTemplateMapper, TemplateString } from './model';

@Component({
  selector: 'app-slides',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Your lesson</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Your lesson</ion-title>
        </ion-toolbar>
      </ion-header>

      @if (lesson.error()) {
        <ion-button (click)="lesson.reload()" expand="full">
          Reload
        </ion-button>
      }

      <div class="ion-padding flex-wrapper">
        <ng-container #container></ng-container>
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
  ],
})
export class SlidesPage {
  private api = inject(Api);
  private errorToast = inject(ErrorToast);
  private route = inject(ActivatedRoute);

  lesson = this.api.getSlide(
    this.route.snapshot.paramMap.get('slide') as unknown as number,
  );

  componentType = computed(() => {
    const template = this.lesson.value()?.template;
    if (!template) return null;
    return stringTemplateMapper[template as TemplateString];
  });

  // viewChild as a signal (returns Signal<ViewContainerRef | undefined>)
  // We use the { read: ViewContainerRef } to get the container directly
  container = viewChild('container', { read: ViewContainerRef });

  constructor() {
    // We use an effect to react whenever the componentType or dataIn changes
    effect(async () => {
      const vcr = this.container();
      const lessonTemplate = this.componentType();
      const dataIn = this.lesson.value();

      if (vcr && lessonTemplate && dataIn) {
        vcr.clear();
        // Todo: make typing work here. Remove as any
        const componentRef = vcr.createComponent(lessonTemplate as any);

        // Use setInput to update the signal input inside the child
        componentRef.setInput('dataIn', dataIn);
      }

      if (this.lesson.error()) {
        await this.errorToast.show('Failed to load steps. Please try again.');
      }
    });
  }
}
