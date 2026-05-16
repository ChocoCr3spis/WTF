import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roomGuard } from './core/guards/room.guard';

const roomModule             = () => import('./screens/room/room.modules').then(m => m.RoomModule);
const homeModule             = () => import('./screens/home/home.modules').then(m => m.HomeModule);

export const routes: Routes = [
  { path: ''     , loadChildren: homeModule },
  { path: 'room' , canActivate: [roomGuard], loadChildren: roomModule }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }