import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { MessageAreaComponent } from './container/message-area/message-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListRoutingModule } from './container/list/list-routing.module';

import { ShareMaterialModule } from './share-material/share-material.module';
import { HomeComponent } from './home/home.component';
import { TripsComponent, DialogSetScheduleDialog } from './trips/trips.component';
import { AlertComponent } from './account/alert/alert.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    MessageAreaComponent,
    HomeComponent,
    TripsComponent,
    DialogSetScheduleDialog,
    AlertComponent,
  ],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ListRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
