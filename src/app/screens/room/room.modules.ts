import { NgModule } from '@angular/core';
import { RoomRoutes } from './room.routes';
import { ToastModule } from 'primeng/toast';
import { SharedModuleModule } from '../../shared/shared.module';
import { Room } from './room';


@NgModule({
  declarations: [
    Room
  ],
  imports: [
    SharedModuleModule,
    RoomRoutes
  ],
  exports: [
    ToastModule
  ]
})

export class RoomModule { }
