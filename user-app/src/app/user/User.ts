export class User {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  address: string;

  constructor(id: number, firstName: string, lastName: string, email: string, company: string, address: string){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.company = company;
    this.address = address;
  }

}
