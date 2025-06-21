import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './UserDashboard.component.html',
  styleUrl: './UserDashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent { }
