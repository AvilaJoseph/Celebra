import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProfileSettings {
  notifications: boolean;
  publicProfile: boolean;
  showEmail: boolean;
  darkMode: boolean;
}

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './UserProfile.component.html',
  styleUrl: './UserProfile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  user = {
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    username: '@mariag_photo',
    bio: 'Fotógrafa apasionada por la naturaleza y los retratos. Explorando el mundo una foto a la vez.',
    location: 'Barcelona, España',
    website: 'www.mariagonzalezphoto.com',
    joinDate: new Date('2023-03-15'),
    avatar: 'https://via.placeholder.com/120x120/6366f1/ffffff?text=MG'
  };

  stats = {
    photos: 147,
    followers: 1248,
    following: 892,
    likes: 5234
  };

  settings: ProfileSettings = {
    notifications: true,
    publicProfile: true,
    showEmail: false,
    darkMode: false
  };

  isEditing = false;
  editForm = { ...this.user };

  settingsOptions = [
    {
      icon: '🔔',
      title: 'Notificaciones',
      description: 'Recibir notificaciones de actividad',
      key: 'notifications' as keyof ProfileSettings
    },
    {
      icon: '🌍',
      title: 'Perfil público',
      description: 'Hacer visible mi perfil para todos',
      key: 'publicProfile' as keyof ProfileSettings
    },
    {
      icon: '📧',
      title: 'Mostrar email',
      description: 'Mostrar email en mi perfil público',
      key: 'showEmail' as keyof ProfileSettings
    },
    {
      icon: '🌙',
      title: 'Modo oscuro',
      description: 'Cambiar a tema oscuro',
      key: 'darkMode' as keyof ProfileSettings
    }
  ];

  menuOptions = [
    { icon: '🔒', title: 'Privacidad y seguridad', action: 'privacy' },
    { icon: '📊', title: 'Estadísticas detalladas', action: 'stats' },
    { icon: '🎨', title: 'Personalización', action: 'customization' },
    { icon: '❓', title: 'Ayuda y soporte', action: 'help' },
    { icon: '⚠️', title: 'Reportar problema', action: 'report' },
    { icon: '🚪', title: 'Cerrar sesión', action: 'logout' }
  ];

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editForm = { ...this.user };
    }
  }

  saveProfile(): void {
    this.user = { ...this.editForm };
    this.isEditing = false;
    console.log('Perfil actualizado:', this.user);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm = { ...this.user };
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editForm.avatar = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  toggleSetting(key: keyof ProfileSettings): void {
    this.settings[key] = !this.settings[key];
    console.log(`${key} cambiado a:`, this.settings[key]);
  }

  handleMenuAction(action: string): void {
    console.log('Acción seleccionada:', action);
    
    switch (action) {
      case 'logout':
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
          console.log('Cerrando sesión...');
        }
        break;
      case 'privacy':
        console.log('Navegando a privacidad...');
        break;
      default:
        console.log(`Ejecutando acción: ${action}`);
    }
  }

  formatJoinDate(): string {
    return this.user.joinDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  }
}