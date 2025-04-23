import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'Main-Celebre-FiltrerPhoto',
  imports: [CommonModule],
  templateUrl: './FiltrerPhoto.component.html',
  styleUrl: './FiltrerPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltrerPhotoComponent { 
  
  showStockModal = false;
  selectedOption: string = 'Tendencias';

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showStockModal = false;
  }

}
