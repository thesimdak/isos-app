import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs/operators';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'svetsplhu.cz - Výsledky';

  public loading: boolean = true;
  public showNav = false;

  constructor(private router: Router, 
    private activeRoute: ActivatedRoute) {
    
  }
  ngOnInit(): void {

    this.activeRoute.queryParams.pipe(skip(1)).subscribe(
      params => {
        if (params['resultView'] != undefined) {
          this.showNav = "true" !== params['resultView'];
        } else {
          this.showNav = true;
        }
      }
    );
    
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }



  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

}
