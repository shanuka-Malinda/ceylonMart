import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   qty: number;
//   category: string;
//   commonStatus: String;
//   imageUrl: String;
// }

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = 'http://localhost:8080/api/product';


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
 
  constructor(private http: HttpClient) { }

  saveProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/saveProduct", product);
  }
  getAllProduct(): Observable<any> {
    return this.http.get(this.apiUrl + "/getAllProduct");
  }

  getProductCount(): Observable<any> {
    return this.http.get(this.apiUrl + "/count");
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProduct/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(this.apiUrl + `/category/${categoryId}`)
      .pipe(
        catchError(this.handleError<any>('getProductsByCategory'))
      );
  }

  updateProduct(product: any): Observable<any> {
    const url = `${this.apiUrl}/updateProduct`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, product, { headers });
  }
}
