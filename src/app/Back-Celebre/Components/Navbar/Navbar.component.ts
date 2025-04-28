import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'Back-Celebre-Navbar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './Navbar.component.html',
  styleUrl: './Navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  showHomeModal = false;
  showTransactionsModal = false;
  showCardsModal = false;
  showSettingsModal = false;
 }
