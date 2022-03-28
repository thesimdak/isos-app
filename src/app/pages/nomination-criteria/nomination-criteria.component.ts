import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { Competition } from 'src/app/shared/model/competition.interface';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Category } from 'src/app/shared/model/category.interface';

@Component({
  selector: 'isos-nomination-criteria',
  templateUrl: './nomination-criteria.component.html',
  styleUrls: ['./nomination-criteria.component.css']
})
export class NominationCriteriaComponent {

  public selectedCategory: number;
  public categories: SelectItem[];

  constructor(private route: ActivatedRoute) {
    this.categories = this.route.snapshot.data['categories'].map((category: Category) => { return { label: category.label, value: category.id } });
  }

  public selectCategory($event) {
    this.selectedCategory = $event.value;
   
  }

}
