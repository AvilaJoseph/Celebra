import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../Navbar/Navbar.component";

@Component({
  selector: 'Home-Celebre-Header',
  imports: [NavbarComponent],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
