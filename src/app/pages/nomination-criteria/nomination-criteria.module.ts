import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NominationCriteriaComponent } from './nomination-criteria.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CardModule,
    DropdownModule,
    ButtonModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    NominationCriteriaComponent
  ],
  providers: [],
  exports: [NominationCriteriaComponent],
})
export class NominationCriteriaModule { }