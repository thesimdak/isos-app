import { Component, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/model/category.interface';
import { ResultService } from 'src/app/shared/services/result.service';
import { Competition } from 'src/app/shared/model/competition.interface';
import { ResultItem } from 'src/app/shared/model/result-item.interface';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'
import { MEN_CATEGORY_ID } from 'src/app/app.constants';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'isos-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ResultsComponent implements OnDestroy {

  private subscription: Subscription;
  public selectedCategory: number;
  public categories: SelectItem[];
  public competition: Competition;
  public results: ResultItem[];
  public loading: boolean = true;
  public categoryId: string;
  public resultView: boolean;
  public showTitle= false;

  constructor(private route: ActivatedRoute, private resultService: ResultService, private location: Location) {
    this.route.queryParams.pipe(skip(1)).subscribe(
      params => {
        if (params['resultView'] != undefined) {
          this.showTitle = "true" !== params['resultView'];
        } else {
          this.showTitle = true;
        }
      }
    );
    this.categories = this.route.snapshot.data['categories'].map((category: Category) => { return { label: category.label, value: category.id } });
    this.competition = this.route.snapshot.data['competition']
    this.categoryId = this.route.snapshot.queryParams['category'];
    this.resultView = "true" === this.route.snapshot.queryParams['resultView'];
    let index = this.findIndexForCategoryId(this.categoryId);
    if (index != -1) {
      this.selectedCategory = this.categories[index].value;
    } else {
      const menCategoryIndex = this.findIndexForCategoryId(MEN_CATEGORY_ID.toString());
      if (this.categories.length - 1 <= menCategoryIndex) {
        this.selectedCategory = this.categories[menCategoryIndex].value;
      } else {
        this.selectedCategory = this.categories[0].value;
      }
      
      let url = this.route.snapshot.url.join('/') + '?category=' + this.selectedCategory;
      url = this.resultView === true ? url + '&resultView=' + this.resultView : url;
      this.location.go(url);
    }
    this.subscription = this.resultService.getResult(this.competition.id, this.selectedCategory)
      .subscribe((results) => {
        this.loading = false;
        this.results = results;
      });
  }

  public selectCategory($event) {
    this.selectedCategory = $event.value;
    this.loading = true;
    let url = this.route.snapshot.url.join('/') + '?category=' + this.selectedCategory;
      url = this.resultView === true ? url + '&resultView=' + this.resultView : url;
    this.location.go(url);
    this.subscription = this.resultService.getResult(this.competition.id, this.selectedCategory)
      .subscribe((results) => {
        this.loading = false;
        this.results = results;
      });
  }

  public isTime3(): boolean {
    if (this.results != null) {
      for (const result of this.results) {
        if (result.time3) {
          return true;
        }
      }
    }
    return false;
  }

  public isTime4(): boolean {
    if (this.results != null) {
      for (const result of this.results) {
        if (result.time4) {
          return true;
        }
      }
    }
    return false;
  }

  public getStringTime(time: Number): String {
    if (time === undefined || time == null) {
      return null;
    }
    if (time === 999) {
      return '-';
    } else {
      return time.toFixed(2).toString();
    }
  }

  private findIndexForCategoryId(categoryId: string): number {
    let i: number = 0;
    for (let item of this.categories) {
      const cat = item.value.toString();
      if (cat === categoryId) {
        return i;
      }
      i++;
    }
    return -1;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
