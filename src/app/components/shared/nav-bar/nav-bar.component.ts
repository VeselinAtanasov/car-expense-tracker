import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentication-service/auth.service';
import { AdminService } from '../../../core/services/admin-service/admin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService : AuthService,
     private router : Router,
     private adminService :AdminService    
    ) { }

  ngOnInit() {
  }
  isAdmin(){
    return this.adminService.isAdmin();
  }

  logout(){
    this.authService.logout().subscribe(data =>{
      this.router.navigate(['/auth/login']);
    }); 
  }
  

}
