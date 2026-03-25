import { Component } from '@angular/core';

interface ILink {
  title: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-contact-links',
  templateUrl: './contact-links.html',
})
export class ContactLinks {
  links: ILink[] = [
    {
      title: 'Facebook',
      href: '#',
      icon: 'fa-brands fa-facebook-f text-xl',
    },
    {
      title: 'Instagram',
      href: '#',
      icon: 'fa-brands fa-instagram text-xl',
    },
    {
      title: 'Email',
      href: '#',
      icon: 'fa-regular fa-envelope text-xl',
    },
    {
      title: 'Phone',
      href: '#',
      icon: 'fa-solid fa-phone text-xl',
    },
  ];
}
