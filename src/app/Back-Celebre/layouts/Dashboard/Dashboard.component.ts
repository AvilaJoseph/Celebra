import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../Components/Navbar/Navbar.component";

@Component({
  selector: 'Back-Celebre-Dashboard',
  imports: [NavbarComponent],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { }
