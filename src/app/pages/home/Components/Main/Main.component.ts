import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core';
import { FiltrerPhotoComponent } from './FiltrerPhoto/FiltrerPhoto.component';
import { ListPhotoComponent } from "./ListPhoto/ListPhoto.component";

@Component({
  selector: 'Home-Celebra-Main',
  imports: [
    FiltrerPhotoComponent,
    ListPhotoComponent
  ],
  templateUrl: './Main.component.html',
  styleUrl: './Main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;
  
  activeButton = 'Inicio';

  onButtonClick(buttonText: string, event: Event) {
    this.activeButton = buttonText;
    
    // Solo hacer scroll en móvil/tablet
    if (window.innerWidth <= 1024) {
      const target = event.target as HTMLElement;
      const container = this.buttonContainer.nativeElement;
      
      // Calcular posición para centrar el botón
      const buttonLeft = target.offsetLeft;
      const buttonWidth = target.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      // Animación suave personalizada
      this.smoothScrollTo(container, scrollPosition, 400);
    }
  }

  private smoothScrollTo(element: HTMLElement, targetPosition: number, duration: number) {
    const startPosition = element.scrollLeft;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      element.scrollLeft = startPosition + (distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  isActive(buttonText: string): boolean {
    return this.activeButton === buttonText;
  }
}