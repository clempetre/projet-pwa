import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { AccueilComponent } from './accueil/accueil.component';
import { UserComponent } from './component/user/user.component';
import { ToastComponent } from './toast/toast.component';

const routes: Routes = [
    { path: 'camera', component: CameraComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'user', component: UserComponent },      
    { path: 'toast', component: ToastComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
