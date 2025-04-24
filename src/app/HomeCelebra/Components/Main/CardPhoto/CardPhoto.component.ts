// CardPhoto.component.ts
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './CardPhoto.component.html',
  styleUrl: './CardPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPhotoComponent {
  @Input() itemNumber: number = 0;
  @Input() itemSize: string = 'normal-size';
  @Input() backgroundColor: string = '#ffffff';
  @Input() content: string = '';
  
  showStockModal = false;
}