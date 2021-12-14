import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppPageNavigationService } from 'projects/tf-ng-nz/src/lib/app-page-navigation/app-page-navigation.service';
import { PeopleComponent } from '../people.component';
import { PeopleService } from '../people.service';


@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html'
})
export class StructureComponent extends PeopleComponent {


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
    this.page = "structure"
  }

  initData(){
    this.peopleService.getOrgStructures().pipe(take(1)).subscribe(data => {
      this.data = data;
      this.setFilteredData();
    }, err => {
      // handle error
    })
  }
}
