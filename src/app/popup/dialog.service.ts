import { Injectable } from '@angular/core';
import { DailogComponent } from './dailog/dailog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  open(title: string, message: string) {
    console.log(title,message);
    const dialogRef = this.dialog.open(DailogComponent, {
      data: { dialogTitle : title, dialogText: message }
    });

  }

  close() {
    this.dialog.closeAll();
  }
}
