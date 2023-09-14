import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DocumentListComponent } from './document-list/document-list.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DocumentListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule ,
    MatDialogModule 
  ]
})
export class HomeModule { }
