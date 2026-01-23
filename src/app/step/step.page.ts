import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-step',
  template: ` <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>step</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">step</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>

    <router-outlet></router-outlet>`,
  styles: ``,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterOutlet,
  ],
})
export class StepPage implements OnInit {
  ngOnInit() {}
}
