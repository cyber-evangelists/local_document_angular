import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/popup/dialog.service';
import { Keys } from 'src/app/proxy-services/Keys';
import { ApiService } from 'src/app/proxy-services/api.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  title = 'DocClient';
  isLoading: boolean = false;
  documents: any[] = [];
  searchTerm: string = '';

  constructor(private apiService :ApiService,
    private dialogService: DialogService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.GetAllFiles();
  }

  GetAllFiles()
  {
this.apiService.getFiles().subscribe(
      (data) => {
        this.documents = data;
        this.isLoading = false; // Set loading to false when data is received

      },
      (error) => {
        //console.error('Error fetching documents:', error);
        this.isLoading = false; // Set loading to false when data is received
        if(error.status == 404)
        {
          this.dialogService.open('Error', 'Error fetching documents Please Contact to Admin');
        }
      }
    );
  }

  Download(docName:string,filepath:string,metadata:string)
  {
    this.apiService.getFile(docName,filepath).subscribe((response: any) => {      
        this.saveFile(response, docName,filepath,metadata);
        this.toastr.info('File DownLoaded', 'Info',{
          positionClass:"toast-bottom-right"
        });
      
    },
   (error)=> {
    if(error.status == 409)
      {
        this.dialogService.open('Warning','file already in editing process by another user');
      }
      else if(error.status == 500)
      {
        this.dialogService.open('Warning','file has virus');
      }
  } 
    );
  }

private saveFile(data: any, fileName: string,filepath:string,metadata:string) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "LFH;" + metadata.substring(1);
  a.click();

  window.URL.revokeObjectURL(url); 
}
}
