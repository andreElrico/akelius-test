import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonButton,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Lingo Bingo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Lingo Bingo</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="welcome-container">
        <h1>Welcome to Your New Favorite Habit!</h1>

        <p>
          Learning a new language shouldn't feel like a chore; it’s an open door
          to a world of
          <span class="highlight">new connections and cultures</span>.
        </p>

        <p>
          Whether you’re here to master a few travel phrases or become fully
          fluent, we’ve made the journey absolutely exhilarating.
        </p>

        <p>
          Forget the dry textbooks and endless grammar drills. Our bite-sized
          lessons feel more like a <span class="highlight">game</span> than a
          classroom, keeping you hooked from the very first tap.
        </p>

        <p>
          You’ll celebrate every win, earn rewards, and watch your progress soar
          in real-time.
        </p>

        <p>
          There is a unique kind of magic in finally understanding a song lyric
          or ordering coffee like a local. It’s about more than just words—it’s
          about the <span class="highlight">confidence</span> you build along
          the way.
        </p>

        <p>
          We are so excited to have you in our global community of curious
          minds.
        </p>

        <ion-button [routerLink]="'./language'">
          Start by selecting a language
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: `
    .welcome-container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      text-align: left;
    }
    h1 {
      color: #4a90e2;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
    .highlight {
      font-weight: bold;
      color: #4a90e2;
    }
  `,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class HomePage {}
