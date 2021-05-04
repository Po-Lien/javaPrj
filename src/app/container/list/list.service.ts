import { getLocaleDayNames } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Name, days, journeys, dayAdd } from '../../data';



@Injectable(
    {
    providedIn: 'root'
    }
  )

  export class ListService {
    isChecked: boolean=false;
    public isCheckedSubject = new BehaviorSubject<any>(this.isChecked);
    sharedIsChecked = this.isCheckedSubject.asObservable();
    
    // day: object[] = this.getList();
    // public daySubject = new BehaviorSubject<any>(this.day);
    // sharedDaySubject = this.daySubject.asObservable();
    
    // title: string ="Title";
    // public titleSubject = new BehaviorSubject<any>(this.title);
    // sharedTitleSubject = this.titleSubject.asObservable();
    
    dayTest = this.getListTest();
    public dayTestSubject = new BehaviorSubject<any>(this.dayTest);
    sharedDayTestSubject = this.dayTestSubject.asObservable();

    //private daysSubject = new BehaviorSubject<

    constructor(private http: HttpClient){
    }

    sendIsChecked(isChecked:boolean) {
      this.isCheckedSubject.next(isChecked);
    }

    getIsChecked(): Observable<any>{
      return this.isCheckedSubject.asObservable();
    }

    getListTest() {
      const daytest = [{
          owner:'',
          member:[''],
          titleId:"5",
          title:'Test(ID=5)',
          day:[{
            date: '2020-10-10',
            day: '第一天',
            week: '星期六',
            tourism: [{
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              },
              {
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              },
              {
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              }]
          },
          {
            date: '2020-10-11',
            day: '第二天',
            week: '星期日',
            tourism: [{
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              }]
          },
          {
            date: '2020-10-12',
            day: '第三天',
            week: '星期一',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          },
          {
            date: '2020-10-13',
            day: '第四天',
            week: '星期二',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          },
          {
            date: '2020-10-14',
            day: '第五天',
            week: '星期三',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          },
          {
            date: '2020-10-15',
            day: '第六天',
            week: '星期四',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          }]
        },
        {
          owner:'',
          member:[''],
          titleId:"6",
          title:'Test(ID=6)',
          day:[{
            date: '2020-10-10',
            day: '第一天',
            week: '星期六',
            tourism: [{
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              },
              {
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              },
              {
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              }]
          },
          {
            date: '2020-10-11',
            day: '第二天',
            week: '星期日',
            tourism: [{
                startTime: '8:00',
                endTime: '9:00',
                forcastTime: '1小時',
                place: '台北轉運站',
                address: '103台北市大同區市民大道一段209號'
              }]
          },
          {
            date: '2020-10-12',
            day: '第三天',
            week: '星期一',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          },
          {
            date: '2020-10-13',
            day: '第四天',
            week: '星期二',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          },
          {
            date: '2020-10-14',
            day: '第五天',
            week: '星期三',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          },
          {
            date: '2020-10-15',
            day: '第六天',
            week: '星期四',
            tourism: [{
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }]
          }]
        }]

      return daytest;
    }

    // getList(){
    //     const day = [
    //         {
    //           date: '2020-10-10',
    //           day: '第一天',
    //           week: '星期六',
    //           startTime: '8:00',
    //           endTime: '9:00',
    //           forcastTime: '1小時',
    //           place: '台北轉運站',
    //           address: '103台北市大同區市民大道一段209號'
    //         },
    //         {
    //           date: '2020-10-11',
    //           day: '第二天',
    //           week: '星期日',
    //           startTime: '8:00',
    //           endTime: '',
    //           forcastTime: '',
    //           place: '',
    //           address: ''
    //         }
    //         ,
    //         {
    //           date: '2020-10-12',
    //           day: '第三天',
    //           week: '星期一',
    //           startTime: '8:00',
    //           endTime: '',
    //           forcastTime: '',
    //           place: '',
    //           address: ''
    //         }
    //         ,
    //         {
    //           date: '2020-10-13',
    //           day: '第四天',
    //           week: '星期二',
    //           startTime: '8:00',
    //           endTime: '',
    //           forcastTime: '',
    //           place: '',
    //           address: ''
    //         }
    //         ,
    //         {
    //           date: '2020-10-14',
    //           day: '第五天',
    //           week: '星期三',
    //           startTime: '8:00',
    //           endTime: '',
    //           forcastTime: '',
    //           place: '',
    //           address: ''
    //         }
    //         ,
    //         {
    //           date: '2020-10-15',
    //           day: '第六天',
    //           week: '星期四',
    //           startTime: '8:00',
    //           endTime: '',
    //           forcastTime: '',
    //           place: '',
    //           address: ''
    //         }
    //       ]

    //       return day;
    // }

    public changeToCN(num: number): string {
      let words = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
      let adds = ["", '十', '百', '千', '萬', '億', '十', '百', '千'];
      if(words[num]){
        return words[num];
      }
      else if(num > 10 && num < 20){
        let numStr = num.toString();
        let n = numStr.substring(1, 2);
        let result = adds[1] + words[n];
        return result;
      }
      else if(num > 10){
        let result = "";
        let numStr = num.toString();
        for (var i = 0; i < numStr.length; ++i) {
          let n = numStr.substring(i, i+1);
          let m = numStr.length - i - 1;
          result += words[n] + adds[m];
        }
        return result;
      }
      else return "零";
    }

    public changeToWeek(num: number) {
      let weekday = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
      return weekday[num];
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened; please try again later.');
    }
    
    
    getcitypoint(cityTourism:HttpParams):Observable<Name[]>{
      let url=`http://localhost:8080/AngularConnect/json/getcitypoint.do`;

      return this.http.get<Name[]>(url,{params:cityTourism});
    }

    findDays(owner: String): Observable<days[]>{
      let url=`http://localhost:8080/findDays/${owner}`;

      return this.http.get<days[]>(url);
    }

    addDays(days: dayAdd[]): Observable<dayAdd[]>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'my-auth-token'
        }),
        withCredential: false
      };
      let url="http://localhost:8080/days/doInsert";
      return this.http.post<dayAdd[]>(url, days, httpOptions)
    }
    
    addTitle(params: journeys):Observable<journeys>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'my-auth-token',
        }),
        withCredential: false
      };
      let url = "http://localhost:8080/journeys/selectTitleId"
      return this.http.post<journeys>(url,params,httpOptions)
    }

    dayDel(titleId: number): Observable<{}>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'my-auth-token',
        }),
        withCredential: false
      };
      const url = `http://localhost:8080/days/doDelete/${titleId}`;
      return this.http.delete(url, httpOptions)
      // .pipe(
      //   catchError(this.handleError('deleteTitle'))
      // );
    }
  
  }