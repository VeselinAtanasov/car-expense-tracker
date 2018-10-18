
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterModel } from '../../../core/models/auth-models/register.model';
import { passwordMatcher } from '../../authentication/password-matcher.directive'
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../core/services/admin-service/admin.service';
import { Router } from '@angular/router';

const usernameRegex: RegExp = /^[A-Za-z0-9]{2,10}$/;
const passwordRegex: RegExp = /^[A-Za-z0-9]{4,10}$/;
const nameRegex: RegExp = /^[A-Z][a-z]+/;
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})

export class AdminRegisterComponent implements OnInit {
  public registerForm: FormGroup;
  //public registerModel: RegisterModel;

  @Input('modify') modify: any;
  @Output() userEmitter = new EventEmitter<any>()
  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  private initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.pattern(usernameRegex)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        Validators.pattern(passwordRegex)
      ]),
      'confirmPassword': new FormControl(''),
      'firstName': new FormControl('', [
        Validators.required,
        Validators.pattern(nameRegex),
      ]),
      'lastName': new FormControl('', [
        Validators.required,
        Validators.pattern(nameRegex)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex)
      ]),
    }, { validators: passwordMatcher })
  }

  ngOnInit() {
    this.initForm();
    if (this.modify) {
      this.adminService.retrieveUser(this.modify).subscribe(data => {
        this.registerForm.patchValue({ ...data })
      })
    }

  }

  register() {
    let userData = this.registerForm.value;
    delete userData['confirmPassword'];
    //   this.registerModel = Object.assign(userData);

    if (this.modify) {
      this.userEmitter.emit(userData);
      return;
    }
    this.adminService.register(userData).subscribe(res => {
      this.toastr.success("You Just Register a new User!", "Success: ")
      this.router.navigate(['/admin/users'])
    });
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

}

