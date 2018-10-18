import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GarageModel } from '../../models/garage/garage.model';
import { Observable } from 'rxjs';
import { dbDescription } from '../../utils/db-config/db-configuration';


const appKey = dbDescription['appKey']   // APP KEY HERE;
const appSecret = dbDescription['appSecret']   // APP SECRET HERE;
const collectionUrl = `https://baas.kinvey.com/appdata/${appKey}/garage`;
const getGarageByUserId = `https://baas.kinvey.com/appdata/${appKey}/garage`;


@Injectable()
export class GarageService {

    constructor(private http: HttpClient) { }

    createGarage(garageData: GarageModel) {
        let data = JSON.stringify(garageData);
        return this.http.post<GarageModel>(collectionUrl, data)
    }

    getMyGarage(userID: string) : Observable<Array<GarageModel>> {
        const url = collectionUrl + `?query={"_acl.creator":"${userID}"}`
        return this.http.get<Array<GarageModel>>(url)
    }
    updateGarageById(garageId, data) {
        const url = collectionUrl + '/' + garageId
        return this.http.put<GarageModel>(url, data)
    }
    deleteGarageByCreatorId(id : string) : Observable<GarageModel> {
        const url =collectionUrl+ `?query={"_acl.creator":"${id}"}`;
        return this.http.delete<GarageModel>(url)
    }
    getAllGarages(state: string): Observable<Array<GarageModel>> {
        if (state === 'public') {
            let url = collectionUrl + `?query={"isPublic":true}`
            return this.http.get<Array<GarageModel>>(url)
        } else {
            let url = collectionUrl  
            return this.http.get<Array<GarageModel>>(url)
        }
    }
    getGarageById(id:string) :Observable<GarageModel> {
        const url = collectionUrl+'/'+id
        return this.http.get<GarageModel>(url)
    }
}
