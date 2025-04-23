import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'Home-Celebra-Navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './Navbar.component.html',
  styleUrl: './Navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { 

  showHomeModal = false;
  showSettingsModal = false;

}
