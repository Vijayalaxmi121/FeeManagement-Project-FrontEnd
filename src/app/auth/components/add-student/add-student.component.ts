import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountantService } from 'src/app/services/accountant.service';
// import { AccountantComponent } from '../accountant/accountant.component';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  errorMsg: boolean = false;
  fee: any;
  paid: any;
  dueFee: any;
  studentObj = {
    studentId: null,
    contactno: null,
    course: null,
    duefees: null,
    emailId: null,
    fee: null,
    gender: null,
    paid: null,
    studentName: null,
    password: null
  }

  constructor(private router: Router, private accountantService: AccountantService) { }


  // @ViewChild('duefees') duefees: ElementRef;
  //  onSubmit(f: NgForm) {
  //   console.log(f.value);  // { first: '', last: '' }
  //   console.log(f.valid);  // false
  // }
  add(student: NgForm) {
    if (student.form.status == 'VALID') {
      //  console.log(this.accountantObj)
      this.studentObj = student.value

      console.log(this.studentObj)
      this.accountantService.addStudent(this.studentObj).subscribe((response) => {
        //console.log(response)
        alert("Posted successfully!!!")
        this.router.navigateByUrl("/due-fees")
      }, error => {
        alert("error occured")
      })
    }else{
      alert('Please complete the full form and submit.')
    }
  }
  ngOnInit(): void {
  }


  checkDueFee() {
    if (this.paid < this.fee) {
      this.dueFee = this.fee - this.paid;
    }
    if (this.paid == this.fee) {
      this.dueFee = 0;
    }
    if (this.paid > this.fee) {
      this.dueFee = null;
      this.paid = null;
      alert("Paid amount shoudn't be more than fee amount!");
    }else{

    }
  }
  //onSubmit(f: NgForm) {
  //  console.log(f.value);  // { first: '', last: '' }
  // console.log(f.valid);  // false
  //}



}
