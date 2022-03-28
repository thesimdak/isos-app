import { Component } from "@angular/core";
import { SelectItem } from "primeng";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { NominationCriteriaService } from "src/app/shared/services/nomination-criteria.service";
import { ResultService } from "src/app/shared/services/result.service";

@Component({
  selector: "nomination-criteria-popup",
  templateUrl: "./nomination-criteria-popup.component.html",
  styleUrls: ["./nomination-criteria-popup.component.css"],
})
export class NominationCriteriaPopupComponent {

  public criteriaSeasons: SelectItem[] = [];
  public selectedSeason: number;

  constructor(resultService: ResultService,
    nominationCriteraService: NominationCriteriaService) {
    combineLatest([resultService.getSeasons(), nominationCriteraService.getNominationCriteriaSeasons()])
      .subscribe(([seasons, nominationCriteriaSeasons]) => {
        for (const season of seasons) {
          if ((nominationCriteriaSeasons as number[]).find(value => value === season) == null) {
            this.criteriaSeasons.push({ label: season, value: season });
          }
        }
        this.criteriaSeasons = this.criteriaSeasons.sort((n1, n2) => {
          if (n1.value > n2.value) {
            return -1;
          }

          if (n1.value < n2.value) {
            return 1;
          }

          return 0;
        });
      }
      );

  }

  public selectSeason(season: number) {
    this.selectedSeason = season;

  }

  public createNominationCriteria(): void {

  }


}
