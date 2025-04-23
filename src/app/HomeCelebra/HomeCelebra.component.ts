import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "./Components/Navbar/Navbar.component";
import { HeaderComponent } from "./Components/Header/Header.component";

@Component({
  selector: 'home-celebra',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './HomeCelebra.component.html',
  styleUrl: './HomeCelebra.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCelebraComponent { }
