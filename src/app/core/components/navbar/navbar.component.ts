import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private getAuth: Auth) {}
  isLoggedIn: any;
  ngOnInit(): void {
    this.isLoggedIn = this.getAuth.currentUser;
    console.log(this.isLoggedIn);
  }
}
