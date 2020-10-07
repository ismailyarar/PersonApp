import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  personsRef: AngularFireList<any>; //  Person veri listesine referans
  personRef: AngularFireObject<any>; //  Person nesnesine referans

  constructor(private database: AngularFireDatabase) {}

  //  Create Person
  addPerson(person: Person) {
    this.personsRef.push({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobileNumber: person.mobileNumber,
    });
  }

  //  Tek person nesnesi getir
  getPerson(id: string) {
    this.personRef = this.database.object('person-list/' + id);
    return this.personRef;
  }

  //  Kişi listesini getir
  getPersonsList() {
    this.personsRef = this.database.list('person-list');
    return this.personsRef;
  }

  //  Update person object
  updatePerson(person: Person) {
    this.personRef.update({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobileNumber: person.mobileNumber,
    });
  }

  //  Delete Person Object
  deletePerson(id: string) {
    this.personRef = this.database.object('person-list/' + id);
    this.personRef.remove();
  }
}
