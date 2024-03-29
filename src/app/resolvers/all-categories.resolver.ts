import { ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionService } from '../shared/services/competition.service';
import { Category } from '../shared/model/category.interface';

@Injectable()
export class AllCategoriesResolver implements Resolve<Observable<Category[]>> {
  private competitionService: CompetitionService;

  constructor(competitionService: CompetitionService) {
    this.competitionService = competitionService;
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Category[]>  {

    return this.competitionService.getAllCategoriesTopResult();
  }
}
