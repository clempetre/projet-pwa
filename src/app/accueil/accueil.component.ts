import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  title = 'projet-pwa';
  readonly VAPID_PUBLIC_KEY = "BDuF8VgyRArMT9ZxvRnyWZMVHVPgMDPI5UA0lrixak-JVyIHZWoB5HePS_Rhrs2nGrG84snWHnnYq0vS4wnVhT8";

  constructor(
      private swPush: SwPush,
      private newsletterService: NewsletterService) {}

  subscribeToNotifications() {

      this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
