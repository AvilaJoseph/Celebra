import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from './types/Comment.interfaces';

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

  // Datos de ejemplo para comentarios si no vienen en el item
  defaultComments: Comment[] = [
    {
      id: 1,
      author: 'María González',
      avatar: 'https://via.placeholder.com/40',
      text: '¡Me encanta esta imagen! Excelente trabajo.',
      date: 'Hace 2 horas'
    },
    {
      id: 2,
      author: 'Carlos Rivera',
      avatar: 'https://via.placeholder.com/40',
      text: 'Los colores están increíbles 👏',
      date: 'Hace 1 día'
    },
    {
      id: 3,
      author: 'Ana Martínez',
      avatar: 'https://via.placeholder.com/40',
      text: 'Inspirador, definitivamente voy a intentar algo similar.',
      date: 'Hace 2 días'
    }
  ];

  close() {
    this.closeModal.emit();
  }

 }
