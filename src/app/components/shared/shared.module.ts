import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination'

import {sharedComponents} from '.';
import { HomeComponent } from './home/home.component'

@NgModule({
    declarations: [
        ...sharedComponents,
        HomeComponent
      ],
      imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule
      ],
      exports: [
        ...sharedComponents,
        RouterModule
      ]
})
export class SharedModule {}