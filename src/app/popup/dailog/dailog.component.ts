import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DailogComponent {
  @Input() title: string = 'Error';
  @Input() message: string = 'Something Want Wrong Please Contact to Admin';

  constructor(private dialogService: DialogService) {
  }

  close() {
    this.dialogService.close();
  }
}
