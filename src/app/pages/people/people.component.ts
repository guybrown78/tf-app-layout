import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { AppPageNavigationService } from 'projects/tf-ng-nz/src/lib/app-page-navigation/app-page-navigation.service';
import { AppPageNavigationItem } from 'projects/tf-ng-nz/src/lib/app-page-navigation/app-page-navigation-item.interface';
import { take } from 'rxjs/operators';
import { PeopleService } from './people.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.less']
})
export class PeopleComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass:string = 'tf-host-flex tf-host-full-height';

  page:string;

  public data:any[];
  public filteredData:any[];
	isLoading:boolean = true;
  currentData:any;
  currentDataLoading:boolean = false;

  private _searchActive:boolean;
  set searchActive(value:boolean){
    this._searchActive = value;
    this.setFilteredData();
  }
  get searchActive():boolean{
    return this._searchActive;
  }

  private _searchValue:string = "";
  set searchValue(value:string){
    this._searchValue = value;
    this.setFilteredData();
  }
  get searchValue():string{
    return this._searchValue;
  }

  pageNaveSubscription:Subscription
  constructor(
    public peopleService:PeopleService,
    public pageNavigationService:AppPageNavigationService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.initPageNavigation();
    this.initData();
  }

  initData(){
    // to be overriden
  }

  initPageNavigation(){
    	// to do when app data/config is realised, or on route change!
      this.pageNavigationService.setData([
        {
          value:"users",
          title:"People",
          icon:"user",
          selected:this.page === "users",
          routePaths:['org-management', 'people', 'users']
        },
        {
          value:"roles",
          title:"Roles",
          icon:"solution",
          selected:this.page === "roles",
          routePaths:['org-management', 'people', 'roles']
        },
        {
          value:"structure",
          title:"Organisational Structure",
          icon:"apartment",
          selected:this.page === "structure",
          routePaths:['org-management', 'people', 'structure']
        },

      ])

      //     actionHandler: (item:QuickLinksItem) => this.onQLActionTest(item)
      this.pageNaveSubscription = this.pageNavigationService.itemSelected.subscribe(item => {
        if(item){
          this.onPageNavItemClicked(item)
        }
      })

  }

  onPageNavItemClicked(item:AppPageNavigationItem){
    // can also use non rout handler similar to quicklinks
    this.router.navigate(item.routePaths);
  }


  onSearchActive(active:boolean){
    this.searchActive = active;
  }
  onSearchValueUpdate(value:string){
    this.searchValue = value;//.toLowerCase();
  }
	onTitleBackClicked(){
		// console.log("clicked back!!!!!")
	}
	onAddNewClicked(){
		console.log("Add new")
	}

  setFilteredData(){
    if(this.searchActive && this.searchValue){
      this.filteredData = this.data.filter(item => item.fullname.toLowerCase().includes(this.searchValue.toLowerCase()))
    }else{
      this.filteredData = [ ...this.data ]
    }
		this.isLoading = false;
  }

	onItemSelected(item:any){
    if(this.searchActive){
      this.searchValue = item.fullname;
    }

    this.currentDataLoading = true;
    this.currentData = item;
    setTimeout(() => {
      this.currentDataLoading = false;
    }, (1 + Math.random()) * 750)
	}

  ngOnDestroy(){
    // remove page navigation data - should self destroy on route change!
    this.pageNavigationService.setData([]);
    this.pageNaveSubscription.unsubscribe();
  }
}
