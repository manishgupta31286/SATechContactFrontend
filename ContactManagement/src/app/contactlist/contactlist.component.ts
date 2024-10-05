import { Component } from '@angular/core';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact-service.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent {
  contacts: Contact[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalContacts: number = 0;
  totalPages: number = 0;
  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getAll(this.searchTerm, this.currentPage, this.pageSize)
      .subscribe(response => {
        console.log(response);
        this.contacts = response.contacts;
        console.log(this.contacts);
        this.totalContacts = response.totalCount;
        this.totalPages = Math.ceil(this.totalContacts / this.pageSize); // Calculate total pages
      });
  }

  searchContacts() {
    this.currentPage = 1; // Reset to first page on new search
    this.getContacts();
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalContacts) {
      this.currentPage++;
      this.getContacts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getContacts();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/edit', id]); // Pass 0 for a new contact
  }

  delete(id: number): void {
    this.contactService.Delete(id).subscribe(() => {

      this.contacts = this.contacts.filter(c => c.id !== id);
    })
  }
}
