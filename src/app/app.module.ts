import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { MessageAreaComponent } from './container/message-area/message-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListRoutingModule } from './container/list/list-routing.module';

import { ShareMaterialModule } from './share-material/share-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    MessageAreaComponent
  ],
  imports: [
    HttpClientModule,
    ShareMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ListRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
