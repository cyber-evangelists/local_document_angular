import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DocumentListComponent } from './document-list/document-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocumentListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule 
  ]
})
export class HomeModule { }
