import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterModel } from '../../models/auth-models/register.model';
import { LoginModel } from '../../models/auth-models/login-model';
import { dbDescription } from '../../utils/db-config/db-configuration';
import { Observable } from 'rxjs';

const appKey = dbDescription['appKey']   // APP KEY HERE;
const appSecret = dbDescription['appSecret']// APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {

    private sessionAuthToken: string;
    private sessionData: Object
    constructor(private http: HttpClient) {

    }

    register(registerModel: RegisterModel) {
        let user = JSON.stringify(registerModel)
        return this.http.post<RegisterModel>(registerUrl, user)
    }
    login(loginModel: LoginModel) {
        let user = JSON.stringify(loginModel)
        return this.http.post<LoginModel>(loginUrl, user)
    }

    logout() {
        return this.http.post(logoutUrl, {})
    }
    eraseSessionData() {
        this.sessionData = null;
        this.sessionAuthToken = null
    }

    importSessionData(data: string) {
        let userData = JSON.parse(data);
        this.sessionAuthToken = userData['token']
        this.sessionData = userData;
    }

    getUserName(): string {
        return JSON.parse(localStorage.getItem('currentUser'))['username']
    }
    get currentSessionData() {
        if (this.sessionData) {
            return this.sessionData;
        }
        return '';

    }
    get authToken(): string {
        return this.sessionAuthToken;
    }
    set authToken(value: string) {
        this.sessionAuthToken = value
    }
    isAuthenticated() {
        return localStorage.getItem('currentUser');
    }

}