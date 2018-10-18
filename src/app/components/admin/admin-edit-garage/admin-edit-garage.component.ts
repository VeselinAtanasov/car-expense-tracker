import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GarageService } from './../../../core/services/garage-services/garage.service';

@Component({
  selector: 'app-admin-edit-garage',
  templateUrl: './admin-edit-garage.component.html',
  styleUrls: ['./admin-edit-garage.component.css']
})
export class AdminEditGarageComponent implements OnInit {

  public id: string
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private garageService: GarageService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getGarageProfile(event){
    let garageData = event['edited'];
    garageData['cars']=event['original']['cars'];

    this.garageService.updateGarageById(this.id,garageData).subscribe(resp =>{
      this.toastr.success("You just modified the garage content!", "Success: ")
      this.router.navigate(['/admin/garages'])
    },err =>this.toastr.error("Error during garage modification!", "Error: "))
     
  }

}
