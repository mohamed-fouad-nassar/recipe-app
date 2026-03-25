import { Component } from '@angular/core';
import { ContactInfo } from '../../components/contact-info/contact-info';
import { ContactForm } from '../../components/contact-form/contact-form';
import { ContactLinks } from '../../components/contact-links/contact-links';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [ContactInfo, ContactLinks, ContactForm],
})
export class Contact {}
