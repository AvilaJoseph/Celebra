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
})
export class CardPhotoComponent {
  @Input() itemNumber: number = 0;
  @Input() itemSize: string = 'normal-size';
  @Input() backgroundColor: string = '#ffffff';
  @Input() content: string = '';
  
  showHoverElements = false;
  showModal = false;
  modalItem = {
    name: 'Paisaje Montañoso',
    description: 'Una hermosa vista de montañas con un atardecer espectacular. Esta imagen captura la belleza natural del paisaje montañoso durante la hora dorada.',
    image: 'https://via.placeholder.com/800x600/4a90e2/ffffff?text=Imagen+de+Paisaje',
    userName: 'Alin Luna',
    userAvatar: 'https://via.placeholder.com/50',
    date: '15 de mayo, 2025',
    likes: 142,
    bookmarks: 28,
    comments: [
      {
        id: 1,
        author: 'María González',
        avatar: 'https://via.placeholder.com/40',
        text: '¡Me encanta esta imagen! Los colores del atardecer están increíbles.',
        date: 'Hace 2 horas'
      },
      {
        id: 2,
        author: 'Carlos Rivera',
        avatar: 'https://via.placeholder.com/40',
        text: '¿Dónde fue tomada esta foto? Me encantaría visitar ese lugar.',
        date: 'Hace 1 día'
      },
      {
        id: 3,
        author: 'Ana Martínez',
        avatar: 'https://via.placeholder.com/40',
        text: 'Excelente composición. El contraste entre las montañas y el cielo es perfecto.',
        date: 'Hace 2 días'
      },
      {
        id: 4,
        author: 'Luis Pérez',
        avatar: 'https://via.placeholder.com/40',
        text: 'Inspirador 🏔️ Definitivamente vas a ser mi fondo de pantalla.',
        date: 'Hace 3 días'
      }
    ]
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}