

export class GarageModel {
    constructor(
        public _id: string,
        public garageName: string,
        public garageDescription : string,
        public isPublic : boolean,
        public createdBy: string,
        public cars : Array<string>
    ) { }
}