import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css'],
})
export class UpdatePersonComponent implements OnInit {
  updateForm: FormGroup; //kişi düzenleme formu tanımı

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router, //  yönlendirici
    private alertfyService: AlertifyService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.updatePersonData();
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.crudService
      .getPerson(id)
      .valueChanges()
      .subscribe((data) => {
        this.updateForm.setValue(data);
      });
  }

  // getters
  get firstName() {
    return this.updateForm.get('firstName');
  }
  get lastName() {
    return this.updateForm.get('lastName');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get mobileNumber() {
    return this.updateForm.get('mobileNumber');
  }

  //reactive form mantığı

  updatePersonData() {
    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  //geri dön
  goBack() {
    this.location.back();
  }

  UpdateForm() {
    this.crudService.updatePerson(this.updateForm.value);
    this.alertfyService.success(
      this.updateForm.controls['firstName'].value + ' başarıyla güncellendi '
    );
    this.router.navigate(['update-person']);
  }
}
