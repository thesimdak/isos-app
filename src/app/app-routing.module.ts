import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonResolver } from './resolvers/season.resolver';
import { LandingComponent } from './pages/landing/landing.component';
import { CompetitionListComponent } from './pages/competition-list/competition-list.component';
import { ResultsComponent } from './pages/results/results.component';
import { CompetitionResolver } from './resolvers/competition.resolver';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { TopResultsCategoriesResolver } from './resolvers/top-results-categories.resolver';
import { TopResultsComponent } from './pages/top-results/top-results.component';

const routes: Routes = [
  {
    path: 'competition-list',
    component: CompetitionListComponent,
    resolve: { seasons: SeasonResolver }
  },
  {
    path: 'results/:resultId',
    component: ResultsComponent,
    resolve: { competition: CompetitionResolver, categories: CategoriesResolver }
  },
  {
    path: 'top-results',
    component: TopResultsComponent,
    resolve: { categories: TopResultsCategoriesResolver }
  },
  {
    path: '',
    component: LandingComponent
  },
 // {
//    path: 'management',
//    component: CompetitionManagementComponent,
//    resolve: { competitions: CompetitionManagementResolver  }
//  },
//  {
//    path: 'competitions/:season',
//    component: CompetitionListComponent,
//    resolve: { competitions: CompetitionResolver  }
//  },
//  {
//    path: 'results/:competitionId',
//    component: ResultListComponent,
//    resolve: { categories: CategoryResolver, competition: CompetitionDetailResolver  }
//  },
//  {
//    path: 'season-list',
//    component: SeasonListComponent,
//    resolve: { seasons: SeasonResolver }
//  },
//  {
//    path: 'rope-climber-list',
//    component: RopeClimberListComponent,
//    resolve: { categories: CategoryTopResultsResolver  }
//  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
