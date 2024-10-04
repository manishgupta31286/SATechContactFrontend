import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = "http://localhost:5046/api";

  constructor(private http: HttpClient) { }
  GetAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Contact`);
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
