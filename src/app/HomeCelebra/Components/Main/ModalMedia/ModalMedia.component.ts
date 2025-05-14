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
})
export class ModalMediaComponent {

  @Input() showModal: boolean = false;
  @Input() item: any;
  @Output() closeModal = new EventEmitter<void>();

  isVisible: boolean = false;

  // Datos de ejemplo para comentarios si no vienen en el item
  defaultComments: Comment[] = [
    {
      id: 1,
      author: 'camiso_x12',
      avatar: 'https://via.placeholder.com/32',
      text: 'OMG qué guapa y hermosa ❤️ como siempre 😍',
      date: '3 d',
      likes: 1,
      replies: 1
    },
    {
      id: 2,
      author: 'katheryn_who',
      avatar: 'https://via.placeholder.com/32',
      text: 'Que lindo esquema de luces 🌟',
      date: '4 d',
      likes: 1,
      replies: 1
    },
    {
      id: 3,
      author: 'merykatesy',
      avatar: 'https://via.placeholder.com/32',
      text: 'Bellas fotos ❤️🔥',
      date: '4 d',
      likes: 1,
      replies: 1
    },
    {
      id: 4,
      author: 'millagrosbalbin',
      avatar: 'https://via.placeholder.com/32',
      text: 'Divaaaaa',
      date: '4 d',
      likes: 1,
      replies: 1
    },
    {
      id: 5,
      author: 'dayaaaquino',
      avatar: 'https://via.placeholder.com/32',
      text: 'Regiaaaaa 💎',
      date: '4 d',
      likes: 1,
      replies: 1
    },
    {
      id: 6,
      author: 'camiso_x12',
      avatar: 'https://via.placeholder.com/32',
      text: '',
      date: '4 d'
    }
  ];

  ngOnChanges() {
    if (this.showModal && !this.isVisible) {
      // Pequeño delay para permitir que el DOM se actualice antes de la animación
      setTimeout(() => {
        this.isVisible = true;
      }, 10);
    } else if (!this.showModal) {
      this.isVisible = false;
    }
  }

  close() {
    this.isVisible = false;
    // Tiempo reducido para cerrar más rápido
    setTimeout(() => {
      this.closeModal.emit();
    }, 150);
  }

  onBackdropClick(event: MouseEvent) {
    // Solo cerramos si el clic fue directamente en el backdrop (no en el contenido)
    this.close();
  }
}