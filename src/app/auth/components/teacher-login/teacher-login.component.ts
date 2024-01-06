import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  errorMsg : boolean =false;

  constructor(private router: Router, private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.teacherService.getTeacherPassword(f.value.username, f.value.password).subscribe(response => {
      console.log(response)
      if(response != null){
        this.errorMsg=false
        this.router.navigateByUrl("/teacher-dashboard")

      }
      else{
        this.errorMsg=true
      }
    })
  }

}
