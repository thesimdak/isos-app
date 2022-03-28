import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CompetitionManagementComponent } from './competition-management.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { NominationCriteriaPopupModule } from './nomination-criteria-popup/nomination-criteria-popup.module';
@NgModule({
    imports: [
      CardModule,
      BrowserModule,
      CommonModule,
      DropdownModule,
      TableModule,
      FormsModule,
      AppRoutingModule,
      ConfirmDialogModule,
      MessageModule,
      MessagesModule,
      DynamicDialogModule,
      NominationCriteriaPopupModule 
              ],
  declarations: [
    CompetitionManagementComponent
  ],
  providers: [DialogService, ConfirmationService, MessageService],
  exports: [CompetitionManagementComponent],
})
export class CompetitionManagementModule { }