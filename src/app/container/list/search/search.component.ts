import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ListService } from '../list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  contry: string[] =  [
    '臺北市', '基隆市', '新北市', '宜蘭縣', '桃園市', '新竹市', '新竹縣', '苗栗縣',
    '臺中市', '彰化縣', '南投縣', '嘉義市', '嘉義縣', '雲林縣', '臺南市', '高雄市',
    '澎湖縣', '金門縣', '屏東縣', '臺東縣', '花蓮縣', '連江縣'
  ];
  filteredOptions: Observable<string[]>;
  myControlPlace = new FormControl();
  place: string[] = ['臺北市','新北市','宜蘭市','基隆市'];

  constructor(private listService: ListService) { }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredOptions = this.myControlPlace.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPlace(value))
    );
  }

  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase();

    return this.contry.filter(contry => contry.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterPlace(value: string): string[]{
    const filterValue = value.toLowerCase();

    return this.place.filter(place => place.toLowerCase().indexOf(filterValue) === 0);
  }


  searchResult;
  //接收搜尋城市景點
  onSubmitCityTourism(): void{
    console.log(this.myControl.value);
    let inputCityTourism = new HttpParams()
      .set('city',this.myControl.value)
      .set('tourism',this.myControlPlace.value);
  
    this.listService.getcitypoint(inputCityTourism).subscribe(data=>{
      this.searchResult=data;
      console.log(data);
    });
  }
  
}
