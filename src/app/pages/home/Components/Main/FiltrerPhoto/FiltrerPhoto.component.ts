import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'Main-Celebre-FiltrerPhoto',
  imports: [
    CommonModule
  ],
  templateUrl: './FiltrerPhoto.component.html',
  styleUrl: './FiltrerPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltrerPhotoComponent { 
  
  showStockModal = false;
  selectedOption: string = 'Tendencias';
  private isMobile = false;
  private touchStartTime = 0;

  constructor() {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkIfMobile();
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showStockModal = false;
  }

  // Métodos para manejo del mouse (desktop)
  onMouseEnter(): void {
    if (!this.isMobile) {
      this.showStockModal = true;
    }
  }

  onMouseLeave(): void {
    if (!this.isMobile) {
      this.showStockModal = false;
    }
  }

  // Método para manejo de click/touch (móviles y desktop)
  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isMobile) {
      this.showStockModal = !this.showStockModal;
    }
  }

  // Manejo de teclado para accesibilidad
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.showStockModal = !this.showStockModal;
        break;
      case 'Escape':
        this.showStockModal = false;
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.showStockModal = true;
        // Focus en la primera opción después de un pequeño delay
        setTimeout(() => {
          const firstOption = document.querySelector('.dropdown-list li') as HTMLElement;
          if (firstOption) {
            firstOption.focus();
          }
        }, 100);
        break;
    }
  }

  // Manejo de teclado en las opciones
  onOptionKeyDown(event: KeyboardEvent, option: string): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectOption(option);
        break;
      case 'Escape':
        this.showStockModal = false;
        // Volver el foco al trigger
        const trigger = document.querySelector('.dropdown-trigger') as HTMLElement;
        if (trigger) {
          trigger.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousOption(event.target as HTMLElement);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextOption(event.target as HTMLElement);
        break;
    }
  }

  private focusPreviousOption(currentElement: HTMLElement): void {
    const previousSibling = currentElement.previousElementSibling as HTMLElement;
    if (previousSibling) {
      previousSibling.focus();
    } else {
      // Si está en el primer elemento, ir al último
      const lastOption = currentElement.parentElement?.lastElementChild as HTMLElement;
      if (lastOption) {
        lastOption.focus();
      }
    }
  }

  private focusNextOption(currentElement: HTMLElement): void {
    const nextSibling = currentElement.nextElementSibling as HTMLElement;
    if (nextSibling) {
      nextSibling.focus();
    } else {
      // Si está en el último elemento, ir al primero
      const firstOption = currentElement.parentElement?.firstElementChild as HTMLElement;
      if (firstOption) {
        firstOption.focus();
      }
    }
  }

  // Cerrar dropdown cuando se hace click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown-wrapper');
    
    if (!dropdown && this.showStockModal) {
      this.showStockModal = false;
    }
  }

  // Manejo específico para touch events en móviles
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartTime = Date.now();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const touchDuration = Date.now() - this.touchStartTime;
    
    // Si es un tap rápido (no un scroll), tratar como click
    if (touchDuration < 200) {
      const target = event.target as HTMLElement;
      if (target.closest('.dropdown-trigger')) {
        this.toggleDropdown(event);
      }
    }
  }
}