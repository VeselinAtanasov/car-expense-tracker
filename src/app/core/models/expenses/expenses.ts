


export class ExpensesModel {
 
    constructor(
      //  public _id: string,
        public carId: string,
        public garageId:string,
        public initialInvestment: number,
        public fuel : number,
        public carRepair : number,
        public consumables: number,
        public accessories: number,
        public cleaning: number,
        public taxes: number,
        public others: number
    ) { }
}