import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  d: any

  constructor(private httpClient: HttpClient, private userAuthService: AuthService) { }


  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }

    return isMatch;
  }

  login(data: any): Observable<Object> {
    return this.httpClient.post(`http://localhost:8080/authenticate`, data, { headers: this.requestHeader, });
  }

  registerUser(data: any): Observable<Object> {
    console.log("Register newUser::::" + data)
    return this.httpClient.post(`http://localhost:8080/registerNewUser`, data, { headers: this.requestHeader, });
  }


  getAllCustomer(): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "/getAllUsers", {});
  }

  getCustomerCount(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/count");
  }
  // checkIfUserNameExists(userName: string): Observable<boolean> {
  //   return this.httpClient.get<boolean>(`${this.apiUrl}/${userName}/exists`);
  // }

}
