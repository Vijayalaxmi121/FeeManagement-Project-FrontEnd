import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { studentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  studentData: any = {};
  title = 'datatables';
  dtOptions: DataTables.Settings = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private studentService: studentService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }
    this.studentData = JSON.parse(this.route.snapshot.paramMap.get("data") || '{}');



  }

  pay(student: any) {
    this.studentService.makePayment(student.duefees).subscribe((res: any) => {
      console.log(res);
      window.open(
        res.redirect_url,
        '_blank'
      );
    });
  }
}
