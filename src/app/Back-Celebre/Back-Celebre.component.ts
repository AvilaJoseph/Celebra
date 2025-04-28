import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "./Components/Navbar/Navbar.component";

@Component({
  selector: 'app-back-celebre',
  imports: [NavbarComponent],
  templateUrl: './Back-Celebre.component.html',
  styleUrl: './Back-Celebre.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackCelebreComponent { }
