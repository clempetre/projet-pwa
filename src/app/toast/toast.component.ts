import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  constructor() { }

  showHelloToast = async () => {
    await Toast.show({
      text: 'Hello!',
    });
  };
}
