import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements OnInit {
  public personForm: FormGroup;

  constructor(
    private alertifyService: AlertifyService,
    public formBuilder: FormBuilder,
    public crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.crudService.getPersonsList();
    this.personnForm();
  }

  //Reactive Person form
  personnForm() {
    this.personForm = this.formBuilder.group({
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

  get firstName() {
    return this.personForm.get('firstName');
  }

  get lastName() {
    return this.personForm.get('lastName');
  }

  get email() {
    return this.personForm.get('email');
  }

  get mobileNumber() {
    return this.personForm.get('mobileNumber');
  }

  //  Reset person form's values
  resetForm() {
    this.personForm.reset();
  }

  submitPersonData() {
    this.crudService.addPerson(this.personForm.value);
    this.alertifyService.success(
      this.personForm.controls['firstName'].value + ' başarıyla eklendi'
    );
    this.resetForm();
  }
}
