import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carlosiglesias1.github.io';
  socialMediaSize = '32px'
  navigationSections = ['Home', 'Projects', 'Skills']
  selectedSection: number = 0

  constructor(private router: Router) { }

  navigateTo(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['welcome'])
        break
      case 1:
        this.router.navigate(['projects'])
        break
      case 2:
        this.router.navigate(['skills'])
        break
      default:
        throw 'Link not foun!'
    }

    this.selectedSection = index
  }
}
