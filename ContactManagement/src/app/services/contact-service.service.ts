import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getAll(searchTerm: string, pageNumber: number, pageSize: number): Observable<{ totalCount: number, contacts: Contact[] }> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ totalCount: number, contacts: Contact[] }>(`${this.apiUrl}/contact`, { params });
  }

  GetById(id: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Contact/${id}`);
  }

  Add(contact: Contact): Observable<string> {
    const data = JSON.stringify(contact);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<string>(`${this.apiUrl}/Contact`,
      data,
      { headers }
    );
  }

  Update(contact: Contact): Observable<string> {
    const data = JSON.stringify(contact);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.put<string>(`${this.apiUrl}/Contact/${contact.id}`,
      data,
      { headers }
    );
  }

  Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Contact/${id}`);
  }
}
