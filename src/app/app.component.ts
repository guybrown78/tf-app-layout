import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  clientLogoSource:string = "https://logodix.com/logo/80482.png"
  currScrollTop:number = 0;
  currScrollDir:string;
  showHeader:boolean = true;

  ngOnInit(): void {
    window.scrollTo(0,1);
  }

  closeBottomDrawer(){
    this.isCollapsed = true;
  }

  onMainContentScroll(event){
    // console.log(event)
    // console.log(event.target.scrollTop)
    const scrollTop = event.target.scrollTop
    const currScrollDir = scrollTop > this.currScrollTop ? 'down' : 'up';
    if(this.showHeader){
      if(currScrollDir === 'down' && this.currScrollTop > 25){
        this.showHeader = false;
      }
    }else{
      if(currScrollDir === 'up' && scrollTop < this.currScrollTop){
        this.showHeader = true;
      }
    }
    this.currScrollDir = currScrollDir;
    this.currScrollTop = scrollTop;
    console.log("currScrollDir", this.currScrollDir, "currScrollTop", this.currScrollTop, "show", this.showHeader)
  }
}
