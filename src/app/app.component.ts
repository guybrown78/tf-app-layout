import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  isCollapsed = true;
  clientLogoSource:string = "https://logodix.com/logo/80482.png"
  currScrollTop:number = 0;
  currScrollDir:string;
  showHeader:boolean = true;

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    var page = document.getElementById('page'),
    ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),
    ios = iphone || ipad,
    // Detect if this is running as a fullscreen app from the homescreen
    fullscreen = true,
    android = ~ua.indexOf('Android'),
    lastWidth = 0;

    if (android) {
      // Android's browser adds the scroll position to the innerHeight, just to
      // make this really fucking difficult. Thus, once we are scrolled, the
      // page height value needs to be corrected in case the page is loaded
      // when already scrolled down. The pageYOffset is of no use, since it always
      // returns 0 while the address bar is displayed.
      window.onscroll = function() {
        page.style.height = window.innerHeight + 'px'
      }
    }
    var setupScroll = window.onload = function() {
      // Start out by adding the height of the location bar to the width, so that
      // we can scroll past it
      if (ios) {
        // iOS reliably returns the innerWindow size for documentElement.clientHeight
        // but window.innerHeight is sometimes the wrong value after rotating
        // the orientation
        var height = document.documentElement.clientHeight;
        // Only add extra padding to the height on iphone / ipod, since the ipad
        // browser doesn't scroll off the location bar.
        if (iphone && !fullscreen) height += 60;
        page.style.height = height + 'px';
      } else if (android) {
        // The stock Android browser has a location bar height of 56 pixels, but
        // this very likely could be broken in other Android browsers.
        page.style.height = (window.innerHeight + 56) + 'px'
      }
      // Scroll after a timeout, since iOS will scroll to the top of the page
      // after it fires the onload event
      setTimeout(scrollTo, 0, 0, 1);
    };
    (window.onresize = function() {
      var pageWidth = page.offsetWidth;
      // Android doesn't support orientation change, so check for when the width
      // changes to figure out when the orientation changes
      if (lastWidth == pageWidth) return;
      lastWidth = pageWidth;
      setupScroll();
    })();
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
