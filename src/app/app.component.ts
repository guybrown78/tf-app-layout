import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  footerMenuIsCollapsed = true;
  footerMenuItemsIsCollapsed = true;
  isCollapsed = true;
  currentMenuType:string;
  //
  clientLogoSource:string = "https://logodix.com/logo/80482.png"
  //
  // currScrollTop:number = 0;
  // currScrollDir:string;
  // showHeader:boolean = true;
  //

  appList:any[] = [
    {name:'Home', code:'home'},
    {name:'Competance Management', code:'cm'},
    {name:'Learning Management', code:'lm'},
    {name:'Training Management', code:'tm'},
  ]

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }
  closeBottomDrawer(){
    this.isCollapsed = true;
  }

  // onMainContentScroll(event){
  //   const scrollTop = event.target.scrollTop
  //   const currScrollDir = scrollTop > this.currScrollTop ? 'down' : 'up';
  //   if(this.showHeader){
  //     if(currScrollDir === 'down' && this.currScrollTop > 25){
  //       this.showHeader = false;
  //     }
  //   }else{
  //     if(currScrollDir === 'up' && scrollTop < this.currScrollTop){
  //       this.showHeader = true;
  //     }
  //   }
  //   this.currScrollDir = currScrollDir;
  //   this.currScrollTop = scrollTop;
  //   console.log("currScrollDir", this.currScrollDir, "currScrollTop", this.currScrollTop, "show", this.showHeader)
  // }

  onToggleMenuIconClicked(menu:string){
    if(!this.currentMenuType || this.currentMenuType === menu){
      this.currentMenuType = !this.isCollapsed ? null : menu;
      this.isCollapsed = !this.isCollapsed
    }else{
      if(!this.isCollapsed){
        // keep open and change the currentMenuType
        this.currentMenuType = menu
      }else{
        // open
        this.currentMenuType = menu
        this.isCollapsed = true
      }
    }
  }
  onItemSelected(){
		// this.isCollapsed = !this.isCollapsed;
    this.onToggleMenuIconClicked(this.currentMenuType)
	}

  onAppSelected(appCode:string){
    this.onItemSelected();
  }

  onFloatingMenuClicked(){
    this.footerMenuIsCollapsed = !this.footerMenuIsCollapsed;
    console.log(this.footerMenuIsCollapsed)
    if(this.footerMenuIsCollapsed){
      this.footerMenuItemsIsCollapsed = true;
    }
  }

  onFooterMenuClicked(menu:string){
    if(!this.currentMenuType || this.currentMenuType === menu){
      this.currentMenuType = !this.footerMenuItemsIsCollapsed ? null : menu;
      this.footerMenuItemsIsCollapsed = !this.footerMenuItemsIsCollapsed
    }else{
      if(!this.footerMenuItemsIsCollapsed){
        // keep open and change the currentMenuType
        this.currentMenuType = menu
      }else{
        // open
        this.currentMenuType = menu
        this.footerMenuItemsIsCollapsed = true
      }
    }



  }
}
