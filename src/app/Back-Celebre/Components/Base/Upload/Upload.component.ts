import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UploadFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
  progress: number;
  uploading: boolean;
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadModalComponent {
  
  @Input() isOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() filesUploaded = new EventEmitter<any[]>();

  files: UploadFile[] = [];
  isDragOver = false;
  
  title = '';
  description = '';
  category = '';
  tags = '';
  isPublic = true;

  categories = ['Naturaleza', 'Retratos', 'Arquitectura', 'Urbano', 'Macro', 'Deportes', 'Eventos', 'Arte', 'Viajes', 'Otros'];
  maxFileSize = 50 * 1024 * 1024;
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];

  closeModal(): void {
    this.modalClosed.emit();
    this.clearFiles();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = Array.from(event.dataTransfer?.files || []);
    this.processFiles(files);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.processFiles(files);
    }
  }

  processFiles(files: File[]): void {
    files.forEach(file => {
      if (this.validateFile(file)) {
        const uploadFile: UploadFile = {
          file,
          preview: '',
          type: file.type.startsWith('image/') ? 'image' : 'video',
          progress: 0,
          uploading: false
        };
        this.createPreview(uploadFile);
        this.files.push(uploadFile);
      }
    });
  }

  validateFile(file: File): boolean {
    if (!this.acceptedTypes.includes(file.type)) {
      alert(`Tipo no soportado: ${file.type}`);
      return false;
    }
    if (file.size > this.maxFileSize) {
      alert(`Archivo muy grande. Máximo: 50MB`);
      return false;
    }
    return true;
  }

  createPreview(uploadFile: UploadFile): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadFile.preview = e.target?.result as string;
    };
    reader.readAsDataURL(uploadFile.file);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
  }

  clearFiles(): void {
    this.files = [];
    this.title = '';
    this.description = '';
    this.category = '';
    this.tags = '';
  }

  uploadFiles(): void {
    if (!this.title.trim()) {
      alert('Ingresa un título');
      return;
    }

    this.files.forEach(file => {
      file.uploading = true;
      this.simulateUpload(file);
    });
  }

  private simulateUpload(uploadFile: UploadFile): void {
    const interval = setInterval(() => {
      uploadFile.progress += Math.random() * 15;
      
      if (uploadFile.progress >= 100) {
        uploadFile.progress = 100;
        uploadFile.uploading = false;
        clearInterval(interval);
        
        if (this.files.every(f => !f.uploading)) {
          this.filesUploaded.emit(this.files);
          setTimeout(() => this.closeModal(), 1000);
        }
      }
    }, 200);
  }
}