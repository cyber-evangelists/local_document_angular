import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keys } from './Keys';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://85.31.232.34:500'; 

  username: string ="";
  password: string="";

  constructor(private http: HttpClient) {
    const name = sessionStorage.getItem(Keys.USERNAME_KEY);
    const pass =  sessionStorage.getItem(Keys.USERPASS_KEY);
    if(name != null && pass != null)
    {
        this.username = name;
        this.password = pass;
    }
  }

  ngOnInit(): void {
   
  }

  login(username:string,password:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      username: username,
      password: password,
    };
    
    return this.http.post(`${this.baseUrl}/login`, body, { headers });
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', this.username);
    formData.append('password', this.password);

    return this.http.post(`${this.baseUrl}/upload_file`, formData);
  }

  getFile(filename: string,filePath:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    
    const name = sessionStorage.getItem(Keys.USERNAME_KEY);
    const pass =  sessionStorage.getItem(Keys.USERPASS_KEY);

    const body = {
      username: name,
      password: pass,
      file_name: filename,
      file_path: filePath
    };
    const options = {
      headers,
      responseType: 'blob' as 'json',
    };

    return this.http.post(`${this.baseUrl}/get_file`, body, options);
  }

  getFiles(): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json;',
    });

    const name = sessionStorage.getItem(Keys.USERNAME_KEY);
    const pass =  sessionStorage.getItem(Keys.USERPASS_KEY);

    const body = {
      username: name,
      password: pass,
    };

    return this.http.post(`${this.baseUrl}/get_files_data`, body);
  }
}
