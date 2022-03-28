import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { Competition } from 'src/app/shared/model/competition.interface';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'isos-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent {

  public selectedSeason: string;
  public seasons: SelectItem[];
  public competitions$: Observable<Competition[]>;
  private datePipe = new DatePipe('en-US');

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService) {
    this.seasons = this.route.snapshot.data['seasons'].map((season) => { return {label: 'Sezóna ' + season, value: season} }).reverse();
    this.selectedSeason = this.seasons[0].value;
    this.competitions$ = this.competitionService.getCompetitionsBySeason(this.selectedSeason);
  }

  public selectSeason($event) {
    this.selectedSeason = $event.value;
    this.competitions$ = this.competitionService.getCompetitionsBySeason(this.selectedSeason);
  }

  public getDate(date: string): string {
    return this.datePipe.transform(new Date(date), 'dd.MM.yyyy');
  }

}
