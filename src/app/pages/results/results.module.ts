import { NgModule } from '@angular/core';
import { ResultsComponent } from './results.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      DropdownModule,
      TableModule,
      FormsModule
              ],
  declarations: [
    ResultsComponent
  ],
  providers: [],
  exports: [ResultsComponent],
})
export class ResultsModule { }