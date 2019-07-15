import {Component, OnInit} from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
