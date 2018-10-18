import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { AdminService } from './../../../core/services/admin-service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-modify',
  templateUrl: './admin-modify.component.html',
  styleUrls: ['./admin-modify.component.css']
})
export class AdminModifyComponent implements OnInit {

  public id: string;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  getUserProfile(event) {
    this.adminService.updateUser(this.id, event).subscribe(res => {
      this.toastr.success("You just modified a user's profile", "Success: ")
      this.router.navigate(['/admin/users'])
    }, err => this.toastr.error("Error during update of user's profile", "Error: "))
  }

}
