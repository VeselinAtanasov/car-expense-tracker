import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGarageComponent } from './my-garage/my-garage.component';
import { CreateGarageComponent } from './create-garage/create-garage.component';
import { DetailsGarageComponent } from './details-garage/details-garage.component';
import { CreateGarageGuard } from '../../core/guards/create-garage.guard';
import { GarageReportComponent } from './garage-report/garage-report.component';

const furnitureRoutes: Routes = [
  { path: 'my', component: MyGarageComponent },
  { path: 'create', component: CreateGarageComponent, canActivate: [CreateGarageGuard] },
  { path: 'details/:id', component: DetailsGarageComponent },
  { path: 'report/:id', component: GarageReportComponent },
]

@NgModule({
  imports: [RouterModule.forChild(furnitureRoutes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }