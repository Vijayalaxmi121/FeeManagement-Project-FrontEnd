import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { studentService } from 'src/app/services/student.service';
import { Student } from 'src/app/student';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  errorMsg : boolean =false;
  student : any=[];

  constructor(private router: Router, private studentService: studentService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.studentService.getStudent(f.value.username, f.value.password).subscribe(response => {
     this.student = response;
      if(response){
        this.errorMsg=false
        this.router.navigate(['/student-dashboard/'+ JSON.stringify({response})])

      }
      else{
        this.errorMsg=true
      }
    })
  }

}
