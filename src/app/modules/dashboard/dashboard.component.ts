import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'firebase/auth';
import { doc, Firestore, getDoc } from 'firebase/firestore';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  // name = getDoc(doc(this.db, 'users'), {
  //   name: `${userData.fname} ${userData.lname}`,
  // });

  logout() {
    this.authService
      .logOut()
      .then((r) => {
        console.log(r);
        this.route.navigate(['/']);
      })
      .catch((e) => console.log('errors' + e));
  }

  ngOnInit(): void {
    const logout = true;
  }
}
