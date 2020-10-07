import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  //  servisimiz hazır
  success(message: string) {
    //bu satırdaki isim bizim verdiğimiz
    alertify.success(message); //bu satırda ki succes ise alertify service in fonksiyonu
    //aynı isim kullanmak güzeldir
  }
}
