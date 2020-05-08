import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
      AppRoutingModule,
      BrowserModule,
      CommonModule
              ],
  declarations: [
    NavigationComponent
  ],
  providers: [],
  exports: [NavigationComponent],
})
export class NavigationModule { }