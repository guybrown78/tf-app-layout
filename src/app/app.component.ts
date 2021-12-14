import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  QuickLinksItem,
  QuickLinksService,
  AppHeaderService,
  AppNavigationService
} from '@3t-transform/tf-ng-nz';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil, take } from 'rxjs/operators';

const appNavigationJSON = [
  {
    "hasSub":false,
    "label":"Dasboard",
    "routerLink":"/dashboard"
  },
  {
    "hasSub":false,
    "label":"Monitor",
    "routerLink":"/monitor"
  },
  {
    "hasSub":false,
    "label":"Welcome",
    "routerLink":"/welcome"
  }
]


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //
  appTitle:string = "Test"
  appReady:boolean = false;
  //
  hideLayout:boolean = false;
  hideLayoutNavigation:boolean = false;
  lockLayoutContent:boolean = false;
  lockLayoutHorizontal:boolean = false;
  lockLayoutVertical:boolean = false;
  hideLayoutHeader:boolean = false;
  layoutHideTogglesAnim:boolean = true;
  //
  constructor(
    private appHeaderService:AppHeaderService,
    private appNavigationService:AppNavigationService,
  ) {}

  ngOnInit(): void {
    //
    this.appNavigationService.navigationData = appNavigationJSON
    this.appNavigationService.navigationDataLoaded = true;
    //
    this.appHeaderService.setOptions({
      clientLogoSource:'https://logodix.com/logo/80482.png',
      userAccountIcon:'logout',
      showUserDropdown:false,
      showUserAccount:false,
      showClientLogo:true,
      showBreadcrumbs:true,
    })
    this.appNavigationService.hasAppStore = false;

    // listen and handle confirmed signout from header modal
    this.appHeaderService.signoutConfirmed.subscribe(
      confirmed => {
        console.log("Sign out confirmed, tell identity")
      }
    );
    //
    this.appReady = true;
  }

}
