import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-tmp-login',
  templateUrl: './tmp-login.component.html',
  styleUrls: ['./tmp-login.component.css']
})
export class TmpLoginComponent implements OnInit {
  user: any = {
    userName: '',
    userPassword: '',
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private _userService: CustomerService,
    private authService: AuthService,
    private _Activatedroute: ActivatedRoute,
    private dialogRef: MatDialogRef<LoginComponent>) {
    {
      const rawData = this._Activatedroute.snapshot.queryParamMap.get('my_object')
    }
  }

  ngOnInit(): void {
   // localStorage.clear();
  }

  onSubmit() {

    // this.user.userName='user';
    // this.user.userPassword='user';

    console.log(this.user);


    this._userService.login(this.user).subscribe(
      (response: any) => {
        console.log(response)
        this.saveToSession(response);
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.dialogRef.close();
          this.router.navigateByUrl('/admin/welcome');
         // window.location.reload();
        } else {
          this.dialogRef.close();
          Swal.fire("successfully login");
          this.router.navigate(['/home']);
          window.location.reload();
        }
      },
      (error: any) => {
        Swal.fire('Oops', 'Username or Password Incorrect!', 'error');
      }
    );
  }

  saveToSession(data: any) {
    localStorage.setItem('roles', JSON.stringify(data.user.role));
    localStorage.setItem('jwtToken', data.jwtToken);
    localStorage.setItem('userName', data.user.userName);
    localStorage.setItem('tel', data.user.tel);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('address', data.user.adress);
    localStorage.setItem('role', data.user.role[0].roleName);
    localStorage.setItem('userID', data.user.userId);
  }
}