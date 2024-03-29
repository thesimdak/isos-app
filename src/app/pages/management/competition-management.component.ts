import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { CompetitionService } from "src/app/shared/services/competition.service";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { SelectItem } from "primeng/api";
import { Observable } from "rxjs";
import { Competition } from "src/app/shared/model/competition.interface";
import { URL_CONSTANTS } from 'src/app/app.constants';
import { Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DatePipe } from "@angular/common";
import { NominationCriteriaService } from "src/app/shared/services/nomination-criteria.service";
import { NominationCriteriaPopupComponent } from "./nomination-criteria-popup/nomination-criteria-popup.component";
import { DialogService } from "primeng";

@Component({
  selector: "isos-competition-management",
  templateUrl: "./competition-management.component.html",
  styleUrls: ["./competition-management.component.css"],
})
export class CompetitionManagementComponent {
  public competitions: any[];
  public router: Router;
  public url: string;
  public heslo: string;

  public selectedSeason: string;
  public seasons: SelectItem[];
  public competitions$: Observable<Competition[]>;
  public nominationCriteriaYears$: Observable<number[]>;
  private datePipe = new DatePipe('en-US');

  constructor( 
    @Inject("BASE_API_URL") private baseUrl: string,
    private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private nominationCriteriaService: NominationCriteriaService,
    private dialogService: DialogService,
    public authenticationService: AuthenticationService,
    public confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.url = this.baseUrl + URL_CONSTANTS["RESULT_UPLOAD"]
    this.init();
  }

  public init() {
    this.seasons = this.route.snapshot.data["seasons"]
      .map((season) => {
        return { label: "Sezóna " + season, value: season };
      })
      .reverse();
    this.selectedSeason = this.seasons[0].value;
    this.competitions$ = this.competitionService.getCompetitionsBySeason(
      this.selectedSeason
    );
    this.nominationCriteriaYears$ = this.nominationCriteriaService.getNominationCriteriaSeasons();
  }

  public selectSeason($event) {
    this.selectedSeason = $event.value;
    this.competitions$ = this.competitionService.getCompetitionsBySeason(
      this.selectedSeason
    );
  }

  public onBasicUpload(event): void {
    this.competitions$ = this.competitionService.getCompetitionsBySeason(
      this.selectedSeason
    );
  }

  public createNominationCriteria(): void {
    this.dialogService.open(NominationCriteriaPopupComponent, {
      header: 'Vytvořit nominační kriteria',
      width: '50%'
  });
  }

  public onFileSend() {
    this.messageService.add({severity:'success', summary:'Uploaduje se...', detail:'Mějte trpělivost, upload závodu může asi minutku trvat.'});
 
  }

  public openResultList(competitionId: number): void {
    this.router.navigateByUrl("results/" + competitionId);
  }

  public authenticate(): void {
    this.authenticationService.authenticate(this.heslo);
  }

  public removeCompetition($event, competitionId: number): void {
    $event.stopPropagation();
    this.confirmationService.confirm({
      message: "Opravdu chcete vymazat závod?",
      accept: () => {
        this.competitionService
          .delete(competitionId)
          .subscribe(
            () =>
              (this.competitions$ = this.competitionService.getCompetitionsBySeason(
                this.selectedSeason
              ))
          );
          this.messageService.add({severity:'success', summary:'Závod bude odstraněn...', detail:'Mějte trpělivost, odstranění závodu může chvilku trvat.'});
      },
    });
  }

  public getDate(date: string): string {
    return this.datePipe.transform(new Date(date), 'dd.MM.yyyy');
  }
}
