import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardComponent } from './layouts/Dashboard/Dashboard.component';

@Component({
  selector: 'app-back-celebre',
  imports: [
    CommonModule,
    DashboardComponent,
  ],
  templateUrl: './Back-Celebre.component.html',
  styleUrl: './Back-Celebre.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackCelebreComponent { }
