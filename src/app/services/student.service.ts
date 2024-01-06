import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentService {

  apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  getStudent(emailId: string, password: string) {
    return this.http.get(this.apiUrl + '/studentlogin/' + '/' + emailId + '/' + password);
  }

  makePayment(sum: any): Observable<any> {
    return this.http.post(this.apiUrl + '/paypal/make/payment?sum=' + sum, {})
      .pipe(map((data: any) => {
        // debugger
        return data;
      }),
        catchError((error) => {
          if (error.status == 404) {
            //Handle Response code here
          }
          return throwError(error);
        })
      );
  }

  // completePayment(paymentId, payerId) {
  //   return this.http.post(this.apiUrl + '/paypal/complete/payment?paymentId=' + paymentId + '&payerId=' + payerId, {})
  //     .map((response: Response) => response.json());
  // }




}
