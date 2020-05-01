import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
    imports: [
      AppRoutingModule
              ],
  declarations: [
    NavigationComponent
  ],
  providers: [],
  exports: [NavigationComponent],
})
export class NavigationModule { }