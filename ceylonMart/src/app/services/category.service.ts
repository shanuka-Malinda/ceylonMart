import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface Category {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories/getAllCategory';
  constructor(private http:HttpClient) { }
  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/getAllCategory").pipe(
      map(response => {
        if (response.status) {
          return response.payload[0]; // Adjust this to match the structure of your response
        } else {
          throw new Error('Failed to fetch categories');
        }
      })
    );
  }

  addCategory(name: string): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/addCategory`, { name }, { headers }).pipe(
      map(response => {
        if (response.status) {
          return response.payload; // Adjust this to match the structure of your reponsse
        } else {
          throw new Error('Failed to add category');
        }
      })
    );
  }




}
