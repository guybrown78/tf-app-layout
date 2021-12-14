import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppPageNavigationService } from 'projects/tf-ng-nz/src/lib/app-page-navigation/app-page-navigation.service';
import { PeopleComponent } from '../people.component';
import { PeopleService } from '../people.service';
import { AppLayoutService } from 'projects/tf-ng-nz/src/public-api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent extends PeopleComponent {

  layoutSubscription:Subscription;
  isMobile:boolean;

  constructor(
    peopleService:PeopleService,
    pageNavigationService:AppPageNavigationService,
    router:Router,
    private layoutService:AppLayoutService,
  ){
    super(
      peopleService,
      pageNavigationService,
      router
    );

    this.page = "users"

    //
    this.layoutSubscription = this.layoutService.isMobile.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  initData(){
    this.peopleService.getUsers(null, 50).pipe(take(1)).subscribe(data => {
      this.data = data;
      this.setFilteredData();
    }, err => {
      // handle error
    })
  }


  setFilteredData(){
    if(!this.isMobile){
      super.setFilteredData();
      return;
    }
    //
    if(this.searchValue.length > 1){
      super.setFilteredData();
    }else{
      this.filteredData = []
      this.isLoading = false;
    }

  }
}
