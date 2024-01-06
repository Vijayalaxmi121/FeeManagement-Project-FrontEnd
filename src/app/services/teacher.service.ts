import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  getTeacherPassword(emailId: string, password: string) {
    return this.http.get(this.apiUrl + '/teacherLogin' + '/' + emailId + '/' + password);
  }


}
