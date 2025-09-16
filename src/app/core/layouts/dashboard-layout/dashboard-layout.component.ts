import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, NgClass, RouterLink],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  isSidebarOpen = true;

  menuState: { [key: string]: boolean} = {
    category: false,
    posts: false,
    plugins: false,
    inventory: false,
  }

  toggle(menu: string) {
    this.menuState[menu] = !this.menuState[menu];
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
