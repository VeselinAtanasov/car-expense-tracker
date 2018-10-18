import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

import {authenticationComponents} from '.';
import { PasswordMatcherDirective } from './password-matcher.directive'
import { AuthService } from "../../core/services/authentication-service/auth.service";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthGuard } from "../../core/guards/auth.guard";



 
@NgModule({
    declarations: [
        ...authenticationComponents,
        PasswordMatcherDirective
      ],
      imports: [
        CommonModule,
        RouterModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule
        
      ],
      providers: [AuthService,AuthGuard],
      exports: [
        ...authenticationComponents
      ]
})
export class AuthenticationModule {}