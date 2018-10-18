import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarModel } from '../../models/cars/car.model';
import { Observable } from 'rxjs';
import { dbDescription } from '../../utils/db-config/db-configuration';



const appKey =dbDescription['appKey']   // APP KEY HERE;
const appSecret = dbDescription['appSecret'] // APP SECRET HERE;
const collectionUrl = `https://baas.kinvey.com/appdata/${appKey}/cars`;



@Injectable()
export class CarsService {

    constructor(private http: HttpClient) { }

    createCar(car: CarModel) {
        let data = JSON.stringify(car);
        return this.http.post<CarModel>(collectionUrl, data)
    }
    getAllCarsByUserID(userID: string) : Observable<Array<CarModel>>{
        const url = collectionUrl+`?query={"_acl.creator":"${userID}"}`
        return this.http.get<Array<CarModel>>(url)
    }
    getAllCarsByGarageId(garageId :string): Observable<Array<CarModel>>{
        const url = collectionUrl+`?query={"garageId":"${garageId}"}`
        return this.http.get<Array<CarModel>>(url)
    }
    getAllCars() : Observable<Array<CarModel>>{
        return this.http.get<Array<CarModel>>(collectionUrl)
    }
    deleteCarByCreatorId(id:string) : Observable<CarModel>{
        const url =collectionUrl+ `?query={"_acl.creator":"${id}"}`;
        return this.http.delete<CarModel>(url);
    }
    deleteCar(id :string) :Observable<any> {
        const url=collectionUrl+'/' +id;
        return this.http.delete<Observable<any>>(url);
    }
    getCarById(id :string) :Observable<CarModel>{
        const url = collectionUrl+'/'+id
        return this.http.get<CarModel>(url)
    }
    updateCarById(id: string, data) : Observable<CarModel>{
        const url = collectionUrl+'/'+id;
        return this.http.put<CarModel>(url,JSON.stringify(data));
    }

}