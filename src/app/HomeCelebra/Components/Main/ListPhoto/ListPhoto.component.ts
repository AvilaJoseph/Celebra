import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'Main-Celebre-ListPhoto',
  imports: [
    CommonModule
  ],
  templateUrl: './ListPhoto.component.html',
  styleUrl: './ListPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPhotoComponent {

  showStockModal = false;
  selectedOption: string = '';

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showStockModal = false;
  }


}
