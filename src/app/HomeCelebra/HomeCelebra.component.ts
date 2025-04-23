import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "./Components/Navbar/Navbar.component";

@Component({
  selector: 'home-celebra',
  imports: [NavbarComponent],
  templateUrl: './HomeCelebra.component.html',
  styleUrl: './HomeCelebra.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCelebraComponent { }
