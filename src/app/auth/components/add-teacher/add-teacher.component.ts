import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { TeacherService } from 'src/app/services/teacher.service';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  errorMsg: boolean = false

  teacherObj = {
    accountantId: null,
    address: null,
    contact: null,
    emailId: null,
    name: null,
    password: null
  }
  //adminService: any;

  constructor(private router: Router, private adminService: AdminService) { }



  //  onSubmit(f: NgForm) {
  //   console.log(f.value);  // { first: '', last: '' }
  //   console.log(f.valid);  // false
  // }
  add(teacher: NgForm) {
    //  console.log(this.accountantObj)
    if (teacher.form.status == 'VALID') {
      this.teacherObj = teacher.value

      console.log(this.teacherObj)
      this.adminService.addTeacher(this.teacherObj).subscribe((response) => {
        //console.log(response)
        alert("Posted successfully!!!")
        this.router.navigateByUrl("/add-teacher")
      }, error => {
        alert("error occured")
      })
    } else {
      alert('Please Complete the form or enter the correct Email Format.')
    }
  }

  ngOnInit(): void {
  }

}
