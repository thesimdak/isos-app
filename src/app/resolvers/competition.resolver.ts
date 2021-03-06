import { ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Competition } from '../shared/model/competition.interface';
import { Observable } from 'rxjs';
import { CompetitionService } from '../shared/services/competition.service';

@Injectable()
export class CompetitionResolver implements Resolve<Observable<Competition>> {
  private competitionService: CompetitionService;

  constructor(competitionService: CompetitionService) {
    this.competitionService = competitionService;
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Competition>  {
    const resultId = route.params['resultId'];
    return this.competitionService.getCompetition(resultId);
  }
}
