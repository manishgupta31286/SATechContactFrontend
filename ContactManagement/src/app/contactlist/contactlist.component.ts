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

  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.GetAll().subscribe(data => {
      this.contacts = data;
    });
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
