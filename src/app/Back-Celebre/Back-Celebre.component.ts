import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-back-celebre',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './Back-Celebre.component.html',
  styleUrl: './Back-Celebre.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackCelebreComponent { }