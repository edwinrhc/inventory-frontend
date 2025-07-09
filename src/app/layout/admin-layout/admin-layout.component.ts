import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {FileIcon, LucideAngularModule, Package} from "lucide-angular";



@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    LucideAngularModule

  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{


  isSidebarOpen = true;

  private auth = inject(AuthService);
  private router = inject(Router);

  readonly FileIcon = FileIcon;
  readonly Package = Package;

  ngOnInit(): void {
    this.isSidebarOpen = window.innerWidth >= 768;
  }

  isLoggedIn():boolean {
    return this.auth.isLoggedIn();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.auth.logout(); // limpia el token
    this.router.navigate(['/auth/login']);
  }

}
