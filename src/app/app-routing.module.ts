import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router'
import { HomeComponent } from './components/shared/home/home.component';
import { GarageModule } from './components/garage/garage.module';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { CarsModule } from './components/cars/cars.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminModule } from './components/admin/admin.module';
import { AdminGuard } from './core/guards/admin.guard';




const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'auth', loadChildren: () => AuthenticationModule },
    { path: 'garage', loadChildren: () => GarageModule, canActivate: [AuthGuard]  },
    { path: 'cars', loadChildren: () => CarsModule , canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: () => AdminModule , canActivate: [AuthGuard, AdminGuard]},
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }