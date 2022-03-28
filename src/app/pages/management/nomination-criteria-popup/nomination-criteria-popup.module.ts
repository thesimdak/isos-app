import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {DropdownModule} from 'primeng/dropdown';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NominationCriteriaPopupComponent } from './nomination-criteria-popup.component';
import { ButtonModule } from 'primeng';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      DropdownModule,
      AppRoutingModule,
      ButtonModule
              ],
  declarations: [
    NominationCriteriaPopupComponent
  ],
  providers: [],
  exports: [NominationCriteriaPopupComponent],
})
export class NominationCriteriaPopupModule { }