import { Component, AfterViewInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import'../../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import'../../../node_modules/leaflet/dist/images/marker-shadow.png';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements AfterViewInit {

  @Input() opened = true;
  isAuthenticated: boolean;

  constructor( 
    private breakpointObserver: BreakpointObserver, 
    private http: HttpClient,
    private authService: AuthService) {
    
    this.authService.isAuthenticated.subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );
    console.log(this.isAuthenticated);
   }

  ngAfterViewInit(): void {
    this.initMap();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  private map;
  marker="";
  latLng;
  routeControl;
  waypointsdiy;
  // public point: Array<Point>= [];

  datasql=[];

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 25.084766,121.5255997 ],
      zoom: 11,      
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    
    tiles.addTo(this.map);
    // this.map.on('click',this.onMapClick);
  
    this.waypointsdiy = [
      L.latLng(25.083999, 121.5481),
      L.latLng(25.079643, 121.556339),
      L.latLng(25.079643, 121.566339),
      L.latLng(25.089643, 121.566339),
      L.latLng(25.089643, 121.536339),
    ];

  var data = [

    {
      "name" : "袖珍博物館",
      "road" : "建國北路一段",
      "city" : "臺北市",
      "lat" : "25.0502862",
      "lon" : "121.5361672"
    },
    {
      "name" : "臺北市立美術館",
      "road" : "中山北路三段",
      "city" : "臺北市",
      "lat" : "25.05620297",
      "lon" : "121.52469283327412"
    },
    {
      "name" : "臺北市立美術館",
      "road" : "中山北路三段",
      "city" : "臺北市",
      "lat" : "25.04620297",
      "lon" : "121.52469283327412"
    },
    {
      "name" : "臺北市立美術館",
      "road" : "中山北路三段",
      "city" : "臺北市",
      "lat" : "25.04620297",
      "lon" : "121.53469283327412"
    },
    {
      "name" : "美麗華百樂園",
      "road" : "敬業三路",
      "city" : "臺北市",
      "lat" : "25.08329345",
      "lon" : "121.55741317249837"
    }
  ];

  this.routeControl = L.Routing.control({
    draggableWaypoints: false,
    lineOptions: {
      styles: [
        {color: 'blue', opacity: 1, weight: 9},
        {color: 'red', opacity: 1, weight: 5}
      ],
    addWaypoints : false
   },
   showAlternatives: false,
   altLineOptions: {
      styles: [
        {color: 'green', opacity: 1, weight: 9}
      ],
      addWaypoints : false
   },
    waypoints: this.waypointsdiy
  }).addTo(this.map);
  // this.routeControl.setWaypoints(data)
  // .addTo(this.map);

  this.routeControl.on('routesfound', function(e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    // alert distance and time in km and minutes
    // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
 });

}

}
