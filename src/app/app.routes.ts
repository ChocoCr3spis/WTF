import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const roomModule             = () => import('./screens/room/room.modules').then(m => m.RoomModule);
const homeModule             = () => import('./screens/home/home.modules').then(m => m.HomeModule);

export const routes: Routes = [
  { path: ''     , loadChildren: homeModule },
  { path: 'room' , loadChildren: roomModule }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }