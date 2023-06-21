import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-pwa';
  readonly VAPID_PUBLIC_KEY = "BDuF8VgyRArMT9ZxvRnyWZMVHVPgMDPI5UA0lrixak-JVyIHZWoB5HePS_Rhrs2nGrG84snWHnnYq0vS4wnVhT8";

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        this.newsletterService
          .addPushSubscriber(sub)
          .subscribe(
            () => console.log('Abonnement aux notifications réussi.'),
            error =>
              console.error('Erreur lors de l\'abonnement aux notifications', error)
          );
      })
      .catch(err =>
        console.error('Impossible de s\'abonner aux notifications', err)
      );
  }
}
