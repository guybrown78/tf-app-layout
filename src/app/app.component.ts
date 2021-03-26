import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  footerMenuIsCollapsed = true;
  footerMenuItemsIsCollapsed = true;
  //
  isMobile:boolean = true;
  isCollapsed = true;
  currentMenuType:string;
  //
  clientLogoSource:string = "https://logodix.com/logo/80482.png"
  //

  appList:any[] = [
    {name:'Home', code:'home'},
    {name:'Competance Management', code:'cm'},
    {name:'Learning Management', code:'lm'},
    {name:'Training Management', code:'tm'},
  ]

  bottomDrawMaskStyle:any = {
    border:'solid 8px #FF0000',
    opacity:'0.1',
    backgroundColor:'#00FF00',
    pointerEvents:'none'
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.onScreenResize()
  }

  onScreenResize(){
    this.isMobile = !(window.screen.width >= 576)
  }

  closeBottomDrawer(){
    this.isCollapsed = true;
  }

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

  onTestClicked(msg:string){
    console.log(">",msg)
  }
}
