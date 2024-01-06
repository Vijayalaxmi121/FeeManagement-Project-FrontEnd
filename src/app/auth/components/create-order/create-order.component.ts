import { Component, OnInit, HostListener } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service.service';


declare var Razorpay: any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  form: any = {};
  paymentId: string = "";
  error: string ="" ;

  constructor(private orderService: OrderServiceService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  options = {
  "key": "",
  "amount": "",
  "name": "Fee Management Application",
  "description": "Fee Application",
  "image": "https://previews.123rf.com/images/keath/keath1609/keath160900267/63404714-payment-icon-money-and-payment-red-button-badge-illustration.jpg",
  "order_id":"",
  "handler": function(response: any){
      var event = new CustomEvent("payment.success",
          {
              detail: response,
              bubbles: true,
              cancelable: true
          }
      );
      window.dispatchEvent(event);
  }
  ,
  "prefill": {
  "name": "",
  "email": "",
  "contact": ""
  },
  "notes": {
  "address": ""
  },
  "theme": {
  "color": "#3399cc"
  }
  };

  onSubmit(): void {
      this.paymentId = '';
      this.error = '';
      this.orderService.createOrder(this.form).subscribe(
        (      data: { secretKey: string; razorpayOrderId: string; applicationFee: string; }) => {
          this.options.key = data.secretKey;
          this.options.order_id = data.razorpayOrderId;
          this.options.amount = data.applicationFee; //paise
          this.options.prefill.name = this.form.name;
          this.options.prefill.email = this.form.email;
          this.options.prefill.contact = this.form.phone;
          var rzp1 = new Razorpay(this.options);
          rzp1.open();

          rzp1.on('payment.failed',  (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) =>{
              // Todo - store this information in the server
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);
              this.error = response.error.reason;
          }
          );
      }
      ,
        (      err: { error: { message: string; }; }) => {
          this.error = err.error.message;
      }
      );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any; }): void {
      this.orderService.updateOrder(event.detail).subscribe(
        (      data: { message: string; }) => {
          this.paymentId = data.message;
      }
      ,
        (      err: { error: { message: string; }; }) => {
          this.error = err.error.message;
      }
      );
  }
}
