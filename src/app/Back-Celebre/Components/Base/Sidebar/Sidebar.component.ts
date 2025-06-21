import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  text: string;
  id: string;
  active?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './Sidebar.component.html',
  styleUrl: './Sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() sections: MenuSection[] = [];

  @Output() menuItemSelected = new EventEmitter<string>();
  @Output() sidebarClosed = new EventEmitter<void>();

  selectMenuItem(item: MenuItem): void {
    this.menuItemSelected.emit(item.id);
  }

  closeSidebar(): void {
    this.sidebarClosed.emit();
  }
}