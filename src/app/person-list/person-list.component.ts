import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { CrudService } from '../services/crud.service';
import { Person } from '../services/person';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  filterText: '';
  p: number = 1;
  Person: Person[]; //  kişi verilerini kişi dizisine aktar
  hideWhenNoPerson: boolean = false; //  kişi olmadığında person tablosunu gizle
  noData: boolean = false; //  veritabanında kayıt yokken kişi yok mesajı gösteriliyor
  preLoader: boolean = true;

  constructor(
    public crudService: CrudService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.dataState(); //  hazır olduğunda listeyi yükle
    let s = this.crudService.getPersonsList();
    s.snapshotChanges().subscribe((data) => {
      //snapshotChanges çağrısı değişikliklerin kontrol altında olmasını sağlar
      this.Person = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Person.push(a as Person);
      });
    });
  }

  //  Basit Person verileri listesini getirmek için valueChanges () yöntemini kullanma.
  //  Person veri listesinde herhangi bir değişiklik meydana geldiğinde, hideWhenNoStudent, noData ve preLoader değişkenlerinin durumunu gerçek zamanlı olarak günceller.
  dataState() {
    this.crudService
      .getPersonsList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoPerson = false;
          this.noData = true;
        } else {
          this.hideWhenNoPerson = true;
          this.noData = false;
        }
      });
  }

  //  Person nesnesini silme
  deletePerson(person) {
    if (window.confirm('bu kişiyi silmek istediğinizden emin misiniz?')) {
      this.crudService.deletePerson(person.$key); //kişiyi silmek servisimizde bulunan function kullanma
      this.alertifyService.success(person.firstName + ' başarıyla silindi');
    }
  }
}
