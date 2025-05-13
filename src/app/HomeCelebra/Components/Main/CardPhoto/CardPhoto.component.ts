// CardPhoto.component.ts
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMediaComponent } from '../ModalMedia/ModalMedia.component';

@Component({
  selector: 'app-card-photo',
  standalone: true,
  imports: [
    CommonModule,
    ModalMediaComponent
  ],
  templateUrl: './CardPhoto.component.html',
  styleUrl: './CardPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPhotoComponent {
    @Input() itemNumber: number = 0;
  @Input() itemSize: string = 'normal-size';
  @Input() backgroundColor: string = '#ffffff';
  @Input() content: string = '';
  
  showHoverElements = false;
  showModal = false;
  modalItem = {
    name: 'Foto de Stock',
    description: 'Esta es la descripción de la imagen seleccionada'
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}