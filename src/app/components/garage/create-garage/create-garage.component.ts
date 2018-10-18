import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GarageModel } from '../../../core/models/garage/garage.model';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { AdminService } from './../../../core/services/admin-service/admin.service';

const urlValidator: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;

@Component({
  selector: 'app-create-garage',
  templateUrl: './create-garage.component.html',
  styleUrls: ['./create-garage.component.css']
})

export class CreateGarageComponent implements OnInit {

  public garageFrom: FormGroup;
  public garageModel :GarageModel

  @Input('garageId') garageId: any;
  @Output() garageEmitter = new EventEmitter<any>()
  constructor(
    private garageService: GarageService,
    private adminService :AdminService
  ) { }

  initForm() {
    this.garageFrom = new FormGroup({
      'garageName': new FormControl('', [
        Validators.required
      ]),
      'garageDescription': new FormControl('', [
        Validators.required
      ]),
      'garagePicture': new FormControl('', [
        Validators.pattern(urlValidator)
      ]),
      'isPublic': new FormControl(false)
    });
  }
  ngOnInit() {
    this.initForm();
    if (this.garageId) {
      this.garageService.getGarageById(this.garageId).subscribe(data => {
        this.garageModel = data
       this.garageFrom.patchValue({ ...data })
      })

    }
  }
  get garageName(): AbstractControl {
    return this.garageFrom.get('garageName');
  }
  get garageDescription(): AbstractControl {
    return this.garageFrom.get('garageDescription');
  }
  get isPublic(): AbstractControl {
    return this.garageFrom.get('isPublic');
  }
  get garagePicture(): AbstractControl {
    return this.garageFrom.get('garagePicture');
  }
  createGarage() {
    let garage = this.garageFrom.value;
    garage['cars'] = []

    if (this.garageId) {
      let obj={
        edited : this.garageFrom.value,
        original:this.garageModel
      }
      this.garageEmitter.emit(obj);
      return;
    }


    this.garageService.createGarage(this.garageFrom.value).subscribe()
  }

}
