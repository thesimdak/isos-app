import { NgModule } from '@angular/core';
import { ResultsComponent } from './results.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      DropdownModule,
      TableModule
              ],
  declarations: [
    ResultsComponent
  ],
  providers: [],
  exports: [ResultsComponent],
})
export class ResultsModule { }