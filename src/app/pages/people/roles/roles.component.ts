import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppPageNavigationService } from 'projects/tf-ng-nz/src/lib/app-page-navigation/app-page-navigation.service';
import { PeopleComponent } from '../people.component';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent extends PeopleComponent {

  constructor(
    peopleService:PeopleService,
    pageNavigationService:AppPageNavigationService,
    router:Router
  ){
    super(
      peopleService,
      pageNavigationService,
      router
    );
    this.page = "roles"
  }

  initData(){
    this.peopleService.getRoles(null).pipe(take(1)).subscribe(data => {
      this.data = data;
      this.setFilteredData();
    }, err => {
      // handle error
    })
  }
}
