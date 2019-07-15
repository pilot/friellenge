import {Component, OnInit} from '@angular/core';
import {ApiFacebookService} from '../../core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private fbService: ApiFacebookService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  loginWithFacebook(): void {
    this.fbService.login().subscribe(
      (data) => {
        this.authService.login(data.authResponse.accessToken)
          .subscribe((res) => {
            this.router.navigate(['/dashboard/challenges']);
          });
      });
  }

}
