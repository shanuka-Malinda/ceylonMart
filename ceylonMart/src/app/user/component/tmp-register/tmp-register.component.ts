import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-tmp-register',
  templateUrl: './tmp-register.component.html',
  styleUrls: ['./tmp-register.component.css']
})
export class TmpRegisterComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  userNameValidate: boolean = false;
  userPasswordValidate: boolean = false;
  adressValidate: boolean = false;
  emailValidate: boolean = false;
  telValidate: boolean = false;
  userConfirmPasswordValidate: boolean = false;
  passwordAndConfirmPasswordValidate: boolean = false;

  maxLength: number = 10;

  ngOnInit(): void {

  }
  user: any = {
    userName: '',
    adress: '',
    email: '',
    tel: '',
    userPassword: '',
    userConfirmPassword: '',
    commonStatus: 'ACTIVE'
  }

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {

  } onSubmit() {


    // if (this.validateForm()) {
    //   return;
    // }

    const regObject = {
      userName: this.user.userName,
      adress: this.user.adress,
      tel: this.user.tel,
      email: this.user.email,
      userPassword: this.user.userPassword,
      role:[
      {
        roleId: "Customer",
        roleName: "Customer"
      }
    ]
    }


    console.log(this.user);
    console.log(regObject);
    this.customerService.registerUser(regObject).subscribe(
      (reponse) => {
        console.log(reponse);
        Swal.fire('Registerd!', '', 'success');
        this.dialogRef.close();
      },
      (error) => {
        console.log('Register error---->' + error);
        Swal.fire('Oops', "Registration Unsuccessfully", error);
      }
    );
  }




  validateForm() {
    console.log(this.user);

    this.userNameValidate = this.user.userName.trim() === '';
    this.adressValidate = this.user.adress.trim() === '';
    this.emailValidate = this.user.email === '';
    this.telValidate = this.user.tel.trim() === '';
    this.userPasswordValidate = this.user.userPassword.trim() === '';
    this.userConfirmPasswordValidate = this.user.userConfirmPassword.trim() === '';

    if (this.user.userPassword.trim() === this.user.userConfirmPassword.trim()) {
      this.passwordAndConfirmPasswordValidate = false;
    } else {
      this.passwordAndConfirmPasswordValidate = true;
    }

    return (
      this.userNameValidate ||
      this.adressValidate ||
      this.emailValidate ||
      this.telValidate ||
      this.userPasswordValidate ||
      this.userConfirmPasswordValidate ||
      this.passwordAndConfirmPasswordValidate
    );

  }


}



















