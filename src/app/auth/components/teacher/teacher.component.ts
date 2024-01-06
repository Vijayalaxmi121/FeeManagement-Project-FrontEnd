import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountantService } from 'src/app/services/accountant.service';
import { EmailserviceService } from 'src/app/services/emailservice.service';
import { Student } from 'src/app/student';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  students: any = [];
  constructor(private http: HttpClient, private accountantService: AccountantService, private router: Router, private emailservice: EmailserviceService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }

    this.http.get('http://localhost:8081/accountantlogin/studentDetails')

      .subscribe((students) => {
        this.students = students;
      });

  }

  onEdit(student: any) {
    // this.router.navigate(['/edit-student',student])
  }

  onDelete(studentId: number) {
    console.log(studentId)
    if (confirm("Do you really want to delete this? ")) {

      this.accountantService.deletestudent(studentId)
        .subscribe(response => {
          alert("Deleted Successfully")
          this.students = this.students.filter(eachStudents => eachStudents.studentId != studentId)
        }, error => {
          alert("Some error occured")
          console.log(error)
        })
    }
  }

  sendEmail(student: any) {

    this.emailservice.sendEmail(student).subscribe(response => {
      alert("Email Sent Successfully");
    }, error => {
      alert("There is some technical issue please try again later.");
    });

  }

}
