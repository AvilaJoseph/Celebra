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
    name: 'Editorial Model Shot',
    description: 'lo admito... me gusta que me tomen fotos!!! 🔥',
    image: 'https://via.placeholder.com/600x400/3B82F6/ffffff?text=Editorial+Model+Shot',
    userName: 'danarocksyou',
    userAvatar: 'https://via.placeholder.com/32',
    location: '',
    editedTime: '4 d',
    timeElapsed: 'Hace 4 días',
    likes: 194,
    comments: [
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