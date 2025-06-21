// CardPhoto.component.ts
import { 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  HostListener,
  OnInit,
  OnDestroy 
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPhotoComponent implements OnInit, OnDestroy {
  @Input() itemNumber: number = 0;
  @Input() itemSize: string = 'normal-size';
  @Input() backgroundColor: string = '#ffffff';
  @Input() content: string = '';
  @Input() userName: string = 'Alin Luna';
  @Input() buttonText: string = 'Ver más';

  @Output() bookmarkClicked = new EventEmitter<void>();
  @Output() heartClicked = new EventEmitter<void>();
  @Output() downloadClicked = new EventEmitter<void>();
  
  showHoverElements = false;
  showModal = false;
  isMobileActive = false;
  
  private isMobile = false;
  private touchStartTime = 0;
  private longPressTimer: any;
  private isLongPress = false;
  private hideElementsTimer: any;

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

  ngOnInit(): void {
    this.detectMobile();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private detectMobile(): void {
    this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  }

  private clearTimers(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }
    if (this.hideElementsTimer) {
      clearTimeout(this.hideElementsTimer);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.detectMobile();
  }

  // Eventos de Mouse (Desktop)
  onMouseEnter(): void {
    if (!this.isMobile) {
      this.clearTimers();
      this.showHoverElements = true;
      this.isMobileActive = false;
    }
  }

  onMouseLeave(): void {
    if (!this.isMobile) {
      this.showHoverElements = false;
      this.isMobileActive = false;
    }
  }

  // Eventos de Click
  onCardClick(event: Event): void {
    if (this.isMobile) {
      event.preventDefault();
      this.toggleMobileElements();
    }
  }

  // Eventos Touch específicos
  onTouchStart(event: TouchEvent): void {
    this.touchStartTime = Date.now();
    this.isLongPress = false;
    
    if (this.isMobile) {
      // Long press para mostrar elementos
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.showMobileElements();
      }, 500);
    }
  }

  onTouchEnd(event: TouchEvent): void {
    this.clearTimers();
    
    if (this.isMobile) {
      const touchDuration = Date.now() - this.touchStartTime;
      
      // Si fue un tap rápido y no long press
      if (touchDuration < 200 && !this.isLongPress) {
        if (this.showHoverElements) {
          this.openModal();
        } else {
          this.toggleMobileElements();
        }
      }
    }
  }

  // Toggle para elementos móviles
  private toggleMobileElements(): void {
    if (this.showHoverElements) {
      this.hideMobileElements();
    } else {
      this.showMobileElements();
    }
  }

  private showMobileElements(): void {
    this.showHoverElements = true;
    this.isMobileActive = true;
    
    // Auto-hide después de 4 segundos
    this.hideElementsTimer = setTimeout(() => {
      this.hideMobileElements();
    }, 4000);
  }

  private hideMobileElements(): void {
    this.showHoverElements = false;
    this.isMobileActive = false;
    this.clearTimers();
  }

  // Eventos de iconos específicos
  onBookmarkClick(event: Event): void {
    event.stopPropagation();
    this.bookmarkClicked.emit();
    console.log('Bookmark clicked');
  }

  onHeartClick(event: Event): void {
    event.stopPropagation();
    this.heartClicked.emit();
    console.log('Heart clicked');
  }

  onDownloadClick(event: Event): void {
    event.stopPropagation();
    this.downloadClicked.emit();
    this.openModal();
  }

  // Touch events para iconos
  onIconTouchStart(event: TouchEvent): void {
    event.stopPropagation();
  }

  onIconTouchEnd(event: TouchEvent): void {
    event.stopPropagation();
  }

  // Touch events para botón
  onButtonTouchStart(event: TouchEvent): void {
    event.stopPropagation();
  }

  onButtonTouchEnd(event: TouchEvent): void {
    event.stopPropagation();
  }

  // Navegación por teclado
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.showHoverElements) {
          this.openModal();
        } else {
          this.toggleMobileElements();
        }
        break;
      case 'Escape':
        if (this.showHoverElements) {
          this.hideMobileElements();
        }
        break;
    }
  }

  onIconKeyDown(event: KeyboardEvent, iconType: string): void {
    event.stopPropagation();
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (iconType === 'bookmark') {
          this.onBookmarkClick(event);
        } else if (iconType === 'heart') {
          this.onHeartClick(event);
        }
        break;
    }
  }

  // Modal methods
  openModal(): void {
    this.showModal = true;
    this.hideMobileElements();
  }

  closeModal(): void {
    this.showModal = false;
  }

  // Click outside handler para móviles
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isMobile && this.showHoverElements) {
      const target = event.target as HTMLElement;
      const card = target.closest('.item');
      
      if (!card) {
        this.hideMobileElements();
      }
    }
  }

  // Prevent context menu on long press
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event): void {
    if (this.isMobile) {
      event.preventDefault();
    }
  }

  // Handle page visibility change
  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(): void {
    if (document.hidden && this.showHoverElements) {
      this.hideMobileElements();
    }
  }
}