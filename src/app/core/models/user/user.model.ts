

export class UserModel {
    constructor(
        public email: string,
        public firstName: string,
        public lastName : string,
        public username : string,
        public _id: string,
        public isAdmin: boolean,
        
    ) { }
}