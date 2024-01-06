import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  createOrder(order:any): Observable<any> {
      return this.http.post(this.apiUrl + '/order', {
      customerName: order.name,
      email: order.email,
      phoneNumber: order.phone,
      amount: order.amount
      }, httpOptions);
  }

  updateOrder(order:any): Observable<any> {
      return this.http.put(this.apiUrl + '/order', {
      razorpayOrderId: order.razorpay_order_id,
      razorpayPaymentId: order.razorpay_payment_id,
      razorpaySignature: order.razorpay_signature
      }, httpOptions);
  }
}
