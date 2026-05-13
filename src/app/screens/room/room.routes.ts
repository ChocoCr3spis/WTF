import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Room } from './room';

const routes: Routes = [
  {
    path: '' ,component: Room
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoomRoutes { }