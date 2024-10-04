import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact-service.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {
  isNew: boolean = false;
  contactForm: any;
  contactId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contactService: ContactService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.contactId = idParam ? +idParam : 0;

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.contactId == 0) {
      this.isNew = true;
    }
    else {
      this.contactService.GetById(this.contactId).subscribe(data => {
        this.contactForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: Contact = {
        id: this.contactId || 0,
        ...this.contactForm.value
      };

      console.log(contactData);
      if (this.isNew) {
        this.contactService.Add(contactData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
      else {
        this.contactService.Update(contactData).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
