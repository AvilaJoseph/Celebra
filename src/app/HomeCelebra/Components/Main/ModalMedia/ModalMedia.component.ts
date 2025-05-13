import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-media',
  imports: [
    CommonModule
  ],
  templateUrl: './ModalMedia.component.html',
  styleUrl: './ModalMedia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalMediaComponent {

  @Input() showModal: boolean = false;
  @Input() item: any;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
 }
