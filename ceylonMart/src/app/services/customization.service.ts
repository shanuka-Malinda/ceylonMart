import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {

  private apiUrl = 'http://localhost:8080/api/customization';
  constructor(private http: HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }





  updateStatus(id: number, newStatus: string): Observable<any> {
    return this.http.put(this.apiUrl + `/updateStatus/${id}?newStatus=${newStatus}`, null); // Assuming the update requires no request body
  }
  getAllCustomization(): Observable<any> {
    return this.http.get(this.apiUrl + "/getAllCustomization");
  }


  getCustomizationCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/count");
  }


  addCustom(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/addCustom", product);
  }

  getCustomizationByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }


}
