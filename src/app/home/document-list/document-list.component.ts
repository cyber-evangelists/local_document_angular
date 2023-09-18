import { Component } from '@angular/core';
import { DialogService } from 'src/app/popup/dialog.service';
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
    private dialogService: DialogService
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
        console.log(this.documents);
        this.isLoading = false; // Set loading to false when data is received

      },
      (error) => {
        //console.error('Error fetching documents:', error);
        this.isLoading = false; // Set loading to false when data is received
        this.dialogService.open('Error', 'Error fetching documents:'+error.message);
      }
    );
  }

  Download(docName:string,filepath:string,metadata:string)
  {
    this.apiService.getFile(docName,filepath).subscribe((response: any) => {
      console.log(response);
      this.saveFile(response, docName,filepath,metadata); // Adjust file name and extension as needed
    },
   (error)=> {
    console.error('Error Downloading:', error);
    this.dialogService.open('Error', 'Error Downloading:'+error.message);
}    
    );
  }

private saveFile(data: any, fileName: string,filepath:string,metadata:string) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = metadata.substring(1);
  a.click();

  window.URL.revokeObjectURL(url); 
}
}
