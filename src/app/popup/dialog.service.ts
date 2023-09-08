import { Injectable } from '@angular/core';
import { DailogComponent } from './dailog/dailog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  open(title: string, message: string) {
    const dialogRef = this.dialog.open(DailogComponent, {
      data: { title, message }
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
