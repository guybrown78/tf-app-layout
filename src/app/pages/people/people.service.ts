import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { DataService } from 'src/app/data/data.service';



@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }



  getUsers(url:string = null, roughCount:number = null, exactCount:number = null){
    // Example of how to do it with API
   /* return this.http
      .get('url')
      .pipe(tap((data) => {
        // If needed, you can do something with the loaded data here. The subscription won't be sent until after this flow has run
        console.log(data)
      })) */

    // create and send dummy data
    const count = this.dataService.getCount(roughCount, exactCount)
    const arr = Array.from({length: count}, () => {
      const randomName = this.dataService.getRandomName();
      return {
        firstname: randomName.firstname,
        surrname: randomName.surname,
        fullname: `${randomName.firstname} ${randomName.surname}`,
        dob: this.dataService.getRandomDOB(),
        email: this.dataService.getRandomEmail(randomName.firstname, randomName.surname),
        active:true
      }
    });
    // return dummy data with a delay for dummy load
    return of(arr).pipe(delay(this.dataService.getCount(2) * 500));
  }

  getRoles(url:string = null){
    // Example of how to do it with API
   /* return this.http
      .get('url')
      .pipe(tap((data) => {
        // If needed, you can do something with the loaded data here. The subscription won't be sent until after this flow has run
        console.log(data)
      })) */

    // create and send dummy data

    const arr = [
      { label:"Rigger" },
      { label:"Oil inspection" },
      { label:"Engineer" }
    ]
    // return dummy data with a delay for dummy load
    return of(arr).pipe(delay(this.dataService.getCount(2) * 500));
  }

  getGroups(url:string){
    /* return this.http
       .get('url') */
   }

   getOrgStructures(url:string = null){

    const arr = [
      { label:"1" },
      { label:"2" },
      { label:"3" },
      { label:"4" },
      { label:"5" }
    ]
    return of(arr).pipe(delay(this.dataService.getCount(2) * 250));
  }



}
