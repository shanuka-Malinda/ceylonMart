import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/order';

  constructor(private http:HttpClient) { }

  createOrder(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/create", product);
  }

  getAllCustomer(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/getAllOderDetail');
  }
  getOrderCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/count");
  }

  getOrdersByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(url, { headers });
  }

}
