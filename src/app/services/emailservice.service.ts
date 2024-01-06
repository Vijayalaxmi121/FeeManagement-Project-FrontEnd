import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {

  apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  sendEmail(student: any) {
    return this.http.get(this.apiUrl + '/send/feesEmail/' + student.emailId + '/' + student.duefees);
  }
}
