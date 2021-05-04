import {Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { device } from '../data/device';

@Injectable(
    {
    providedIn: 'root'
    }
  )

export class DeviceService {
    device: device = {xl:false,lg:false,md:false,sm:false,xs:false};

    public deviceSubject = new BehaviorSubject<device>(this.device);
    sharedDevice = this.deviceSubject.asObservable();

    // public get deviceValue(): device {
    //     return this.deviceSubject.value;
    // }
}