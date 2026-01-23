import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-language',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>language</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">language</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>`,
  styles: ``,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class LanguagePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
