// ListPhoto.component.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPhotoComponent } from '../CardPhoto/CardPhoto.component';

interface CardItem {
  id: number;
  content: string;
  size: string;
  backgroundColor: string;
  gridRow: string;
}

@Component({
  selector: 'Main-Celebre-ListPhoto',
  standalone: true,
  imports: [
    CommonModule,
    CardPhotoComponent
  ],
  templateUrl: './ListPhoto.component.html',
  styleUrl: './ListPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPhotoComponent {
  cards: CardItem[] = [
    { id: 1, content: 'Elemento 1', size: 'normal-size', backgroundColor: '#ff6f61', gridRow: 'span 23' },
    { id: 2, content: 'Elemento 2', size: 'small-size', backgroundColor: '#6b5b95', gridRow: 'span 20' },
    { id: 3, content: 'Elemento 3', size: 'small-size', backgroundColor: '#88b04b', gridRow: 'span 23' },
    { id: 4, content: 'Elemento 4', size: 'normal-size', backgroundColor: '#d65076', gridRow: 'span 20' },
    { id: 5, content: 'Elemento 5', size: 'normal-size', backgroundColor: '#ffb347', gridRow: 'span 23' },
    { id: 6, content: 'Elemento 6', size: 'small-size', backgroundColor: '#45b8ac', gridRow: 'span 23' },
    { id: 7, content: 'Elemento 7', size: 'normal-size', backgroundColor: '#e94b3c', gridRow: 'span 20' },
    { id: 8, content: 'Elemento 8', size: 'small-size', backgroundColor: '#6c5b7b', gridRow: 'span 23' },
    { id: 9, content: 'Elemento 9', size: 'normal-size', backgroundColor: '#00a86b', gridRow: 'span 23' },
    { id: 10, content: 'Elemento 10', size: 'small-size', backgroundColor: '#b565a7', gridRow: 'span 9' }
  ];
}