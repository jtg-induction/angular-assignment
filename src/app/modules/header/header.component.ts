import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ProjectRoutes } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private getAuth: Auth, private authService: AuthService, private route: Router) {}

  currentUser: User;

  ngOnInit(): void {
    this.getAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async logout() {
    await this.authService.logOut();
    this.route.navigate([`${ProjectRoutes.AUTH}/${ProjectRoutes.SIGNIN}`]);
  }
}
