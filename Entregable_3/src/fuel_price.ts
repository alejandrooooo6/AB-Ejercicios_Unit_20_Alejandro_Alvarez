export class FuelPrice {
  date: string;
  province: string;
  diesel: number;
  gasoline: number;

  constructor(date: string, province: string, diesel: number, gasoline: number) {
    this.date = date;
    this.province = province;
    this.diesel = diesel;
    this.gasoline = gasoline;
  }
}