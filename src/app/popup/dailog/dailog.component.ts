import {  Component,  Inject,  Input } from '@angular/core';
import { DialogService } from '../dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DailogComponent {

  constructor(private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogService.close();
  }
}
