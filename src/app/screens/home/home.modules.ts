import { NgModule } from '@angular/core';
import { Home } from './home';
import { HomeRoutes } from './home.routes';
import { SharedModuleModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    Home
  ],
  imports: [
    SharedModuleModule,
    HomeRoutes,
  ],
  exports: [

  ]
})

export class HomeModule { }
