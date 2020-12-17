import { getLocaleDayNames } from '@angular/common';
import { Injectable } from '@angular/core';
import { day } from 'src/app/data/schedule';
import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import { Name } from '../../data/Name';



@Injectable(
    {
    providedIn: 'root'
    }
  )

  export class ListService {
    isChecked$:  Observable<any>;
    private isCheckedSubject = new Subject<any>();

    constructor(private http: HttpClient){
      this.isChecked$ = this.isCheckedSubject.asObservable();
    }

    isChecked(data) {
      console.log(data);
      this.isCheckedSubject.next(data);
    }

    getList(){
        const day = [
            {
              date: '2020/10/10',
              day: '第一天',
              startTime: '8:00',
              endTime: '9:00',
              forcastTime: '1小時',
              place: '台北轉運站',
              address: '103台北市大同區市民大道一段209號'
            },
            {
              date: '2020/10/11',
              day: '第二天',
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }
            ,
            {
              date: '2020/10/12',
              day: '第三天',
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }
            ,
            {
              date: '2020/10/13',
              day: '第四天',
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }
            ,
            {
              date: '2020/10/14',
              day: '第五天',
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }
            ,
            {
              date: '2020/10/15',
              day: '第六天',
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }
          ]
          return day;
    }

    url=`http://localhost:8080/AngularConnect/json/getcitypoint.do`;
 
   
    getcitypoint(cityTourism:HttpParams):Observable<Name[]>{
      return this.http.get<Name[]>(this.url,{params:cityTourism});
    }
   

  
  }