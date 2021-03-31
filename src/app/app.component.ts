import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, HostListener, Input, TemplateRef } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  //
  isMobile:boolean = true;
  isCollapsed = true;
  drawIsActive = false;
  sideBarIsActive = false;
  currentMenuType:string;
  currentMenuColour:string = "blue";
  //
  mobileThreshold:number = 674;//576;
  //
  clientLogoSource:string = "https://logodix.com/logo/80482.png"
  appTitle:string = "Learning Management"
  //
  mql:any
  //
  appList:any[] = [
    {name:'Competance Management', code:'cm'},
    {name:'Learning Management', code:'lm'},
    {name:'Training Management', code:'tm'},
  ]
  discoverAppList:any[] = [
    {name:'R3 Demo', code:'r3'},
    {name:'VR Digital Twin Preview', code:'vr'},
  ]

  drawerRef:NzDrawerRef;
  isSignOutModalVisible:boolean = false;

  @ViewChild('menuDrawHeader', { static: false }) menuDrawHeader?: TemplateRef<{
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('mobileMenuDrawHeader', { static: false }) mobileMenuDrawHeader?: TemplateRef<{
    drawerRef: NzDrawerRef<string>;
  }>;


  @ViewChild('drawerAppMenuTemplate', { static: false }) drawerAppMenuTemplate?: TemplateRef<{
    $implicit: { };
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('drawerAppStoreTemplate', { static: false }) drawerAppStoreTemplate?: TemplateRef<{
    $implicit: { };
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('drawerMobileTemplate', { static: false }) drawerMobileTemplate?: TemplateRef<{
    $implicit: { currentMenuType: string};
    drawerRef: NzDrawerRef<string>;
  }>;


  // @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
  //   $implicit: { value: string };
  //   drawerRef: NzDrawerRef<string>;
  // }>;
  // value = 'ng';

  resolvedPromiseMethod() {
    return Promise.resolve();
  }

  constructor(private drawerService: NzDrawerService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.mql = window.matchMedia(`(min-width: ${this.mobileThreshold}px)`);
    this.mql.addEventListener( "change", (e) => {
      this.isMobile = !e.matches;
      this.updateDrawer()
    })
    this.onScreenResize()
  }

  onScreenResize(){
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.isMobile = !(width >= this.mobileThreshold);
  }

  onToggleMenuIconClicked(menu:string, createDrawer:boolean = true){
    let setDraw = createDrawer;
    if(!this.currentMenuType || this.currentMenuType === menu){
      this.currentMenuType = !this.isCollapsed ? null : menu;
      this.isCollapsed = !this.isCollapsed
    }else{
      if(!this.isCollapsed){
        // keep open and change the currentMenuType
        if(this.isMobile){
          setDraw = false;
        }
        this.currentMenuType = menu
      }else{
        // open
        this.currentMenuType = menu
        this.isCollapsed = true
      }
    }
    this.setMenuColour(this.currentMenuType);
    if(setDraw){
      this.setDraw()
    }

  }

  setDraw(){

    if(this.isCollapsed){
      this.drawerRef?.close();
    }else{
      this.sideBarIsActive = true;
      this.createDrawer();
    }
  }

  getDrawerWrapClassName(colour){
    return `tf-draw-menu ${this.isMobile ? 'mobile' : 'desktop'} ${colour}`
  }
  createDrawer(){
    this.drawerRef?.close();
    this.drawerRef = null;
    //
    let className = this.getDrawerWrapClassName(this.currentMenuColour)
    const drawer = this.drawerService.create({
      nzClosable:false,
      nzTitle: this.isMobile ? this.mobileMenuDrawHeader : this.menuDrawHeader,
      nzPlacement:'left',
      nzContent: this.isMobile ? this.drawerMobileTemplate
      : this.currentMenuType === "app-menu"
        ? this.drawerAppMenuTemplate
        : this.drawerAppStoreTemplate,
      // nzContentParams: {value: this.value},
      nzWidth: this.isMobile ? '100%' : 260,
      nzOffsetX: this.isMobile ? 0 : 80,
      nzWrapClassName: className,
      nzZIndex:1000,
      nzMaskStyle:{ backgroundColor:'rgba(0,0,0,0)' },
      nzOnCancel:() => {

        return this.resolvedPromiseMethod()
          .then(res => {
            this.onToggleMenuIconClicked(this.currentMenuType, false)
          })
          .catch(() => {
            return false
          });
      }
    });

    drawer.afterOpen.subscribe(() => {
      this.drawIsActive = true;
    });

    drawer.afterClose.subscribe(() => {
      this.drawIsActive = false;
      if(this.isCollapsed){
        this.sideBarIsActive = false
      }
    });

    this.drawerRef = drawer as NzDrawerRef;
  }

  updateDrawer(){
    if(this.drawerRef && !this.isCollapsed){
      this.onCloseDrawer();
    }
  }

  onItemSelected(){
    this.onToggleMenuIconClicked(this.currentMenuType)
	}

  onCloseDrawer(){
    this.onToggleMenuIconClicked(this.currentMenuType)
  }

  onAppSelected(appCode:string){
    this.onItemSelected();
  }

  setMenuColour(menu){
    const colour = menu === "app-menu" ? 'white' : 'blue'
    this.currentMenuColour = colour;
    if(this.drawerRef && this.isMobile){
      this.drawerRef.nzWrapClassName = this.getDrawerWrapClassName(colour)
    }
  }

  onUserAccountsMenuToggle(isOpen:boolean){
    this.isSignOutModalVisible = true;
  }


  handleCancelSignOut(){
		this.isSignOutModalVisible = false;
	}
	handleOkSignOut(){
		this.isSignOutModalVisible = false;
	}


  ngOnDestroy(){
    this.mql.removeEventListener( "change" );
  }
}
