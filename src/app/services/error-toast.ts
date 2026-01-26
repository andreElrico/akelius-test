import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ErrorToast {
  toastController = inject(ToastController);

  async show(message: string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message,
      color: 'danger',
      duration: 5000,
    });

    await toast.present();
  }
}
