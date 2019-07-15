import {Component, OnInit} from '@angular/core';
import {ADMIN_MENU} from '../../models/admin.menu';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  public menuItems: any[] = ADMIN_MENU;

  constructor() {
  }

  ngOnInit() {
  }
}
