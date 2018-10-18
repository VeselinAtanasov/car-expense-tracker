import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarModel } from '../../models/cars/car.model';
import { Observable } from 'rxjs';
import { dbDescription } from '../../utils/db-config/db-configuration';
import { UserModel } from '../../models/user/user.model';


const appKey = dbDescription['appKey']   // APP KEY HERE;
const appSecret = dbDescription['appSecret'] // APP SECRET HERE;
const masterSecret = dbDescription['masterSecret']

const roleUrl = `https://baas.kinvey.com/roles/${appKey}`
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const basicUrl = `https://baas.kinvey.com/user/${appKey}`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const userIdRole = `https://baas.kinvey.com/user/${appKey}/`;



@Injectable()
export class AdminService {

    constructor(private http: HttpClient) { }

    isAdmin() {
        return localStorage.length !== 0 && JSON.parse(localStorage.getItem('currentUser'))['isAdmin'] && JSON.parse(localStorage.getItem('currentUser'))['isAdmin'] === dbDescription['adminId']
    }
    getAdminRoleId() {
        return dbDescription['adminId']
    }

    deleteUser(userId: string): Observable<UserModel> {
        let url = basicUrl + '/' + userId
        return this.http.delete<UserModel>(url)
    }

    /**
     * This method retrieve all user Information
     * @param userId 
     */
    retrieveUser(userId): Observable<UserModel> {
        let url = basicUrl + '/' + userId
        return this.http.get<UserModel>(url
            //      {
            //     headers: new HttpHeaders({
            //         'Authorization': `Kinvey ${localStorage.getItem('authToken')}`,
            //         'Content-Type': 'application/json'
            //     })
            // }
        )
        // GET to /user/:appKey/:id
    }

    getAllUsers(): Observable<Array<UserModel>> {
        let url = basicUrl
        return this.http.get<Array<UserModel>>(url)
    }

    updateUser(userID: string, user:UserModel): Observable<UserModel> {
        const url =basicUrl +'/'+userID;
        return this.http.put<UserModel>(url,JSON.stringify(user))
    }

    register(user) {
        return this.http
            .post(basicUrl, user, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
    }
    login(user) {
        return this.http
            .post(loginUrl, user, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
    }


    // Roles Administration:

    /**
   * This Method creates Role the response contains RoleID,RoleName,RoleDescription
   * @param user 
   */
    createRole(user) {
        return this.http
            .post(roleUrl, user, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
    }

    /**
     * This method assigns Role to a specific user;
     * There is an option to assign one Role to bulk of users :https://devcenter.kinvey.com/rest/guides/roles
     * @param userId 
     * @param userRoleId 
     */
    assignRoleToUser(userId, userRoleId): Observable<UserModel> {
        let url = userIdRole + userId + '/roles/' + userRoleId
        return this.http.put<UserModel>(url, JSON.stringify({}))
        //send a PUT request to /user/:appKey/:userId/roles/:roleId with an empty JSON body.
    }

    /**
     * This method returns array of all Roles for which the user is subscribed.
     * The array contains object which RoleId, RoleName is NOT present
     * @param userId 
     */
    getRoleByUserId(userId): Observable<Array<string>> {
        let url = userIdRole + `${userId}/roles`
        return this.http
            .get<Array<string>>(url, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
    }

    /**
     * This method deletes role From a user
     * @param userId 
     * @param userRoleId 
     */
    deleteRoleFromUser(userId, userRoleId) {
        let url = userIdRole + userId + '/roles/' + userRoleId
        return this.http.delete(url)
    }

    /**
     * This method is used to return array of all users currently residing in this Role
     *  Example of the response : {grantDate : "2018-08-09T08:44:24.937Z",grantedBy : "kid_B1UadEnVQ",userId : "5b5ed173103c460eb9f945f8 }
     * @param roleId 
     * 
     */
    getAllRoleMembers(roleId) {
        let url = roleUrl + '/' + roleId + '/membership'
        return this.http
            .get(url, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
        //GET request to /roles/:appKey/:roleId/membership
    }

    /**
     * This method returns all defined Roles in array of object, each one containing RoleID, RoleName,RoleDescription
     */
    listAllRoles() {
        return this.http
            .get(roleUrl, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
        //send a GET request to /roles/:appKey.
    }

    /**
     * This method is used to return object with RoleId and corresponding Role Name
     * @param roleID string representing currentRoleId
     */
    getSpecificRole(roleID) {
        let url = roleUrl + '/' + roleID
        return this.http
            .get(url, {
                headers: new HttpHeaders({
                    'Authorization': `Basic ${btoa(`${appKey}:${masterSecret}`)}`,
                    'Content-Type': 'application/json'
                })
            })
        //To fetch a specific role, send a GET request to /roles/:appKey/:roleId.
    }

}