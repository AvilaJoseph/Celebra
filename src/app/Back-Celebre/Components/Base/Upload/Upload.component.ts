// Upload.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UploadFile {
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'zip';
  progress: number;
  uploading: boolean;
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './Upload.component.html',
  styleUrl: './Upload.component.css'
})
export class UploadModalComponent {
  @Input() isOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() filesUploaded = new EventEmitter<any>();

  files: UploadFile[] = [];
  isDragOver = false;
  currentStep = 1; // 1: file selection, 2: form details
  
  // Form data
  title = '';
  description = '';
  category = '';
  photographerName = '';

  // Configuration
  maxFiles = 5;
  maxFileSize = 50 * 1024 * 1024; // 50MB
  acceptedTypes = [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/svg+xml',
    'application/zip'
  ];

  closeModal(): void {
    this.modalClosed.emit();
    this.resetForm();
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
      // Reset input to allow selecting the same files again
      input.value = '';
    }
  }

  processFiles(files: File[]): void {
    // Check if adding these files would exceed the limit
    if (this.files.length + files.length > this.maxFiles) {
      alert(`You can only upload up to ${this.maxFiles} files. Currently you have ${this.files.length} files selected.`);
      return;
    }

    files.forEach(file => {
      if (this.validateFile(file)) {
        const uploadFile: UploadFile = {
          file,
          type: this.getFileType(file),
          progress: 0,
          uploading: false
        };
        
        // Create preview for images
        if (file.type.startsWith('image/')) {
          this.createPreview(uploadFile);
        }
        
        this.files.push(uploadFile);
      }
    });
  }

  validateFile(file: File): boolean {
    // Check file type
    if (!this.acceptedTypes.includes(file.type)) {
      alert(`File type not supported: ${file.type}. Only JPG, PNG, SVG and ZIP files are allowed.`);
      return false;
    }
    
    // Check file size
    if (file.size > this.maxFileSize) {
      alert(`File too large: ${file.name}. Maximum size is 50MB.`);
      return false;
    }
    
    // Check for duplicates
    const isDuplicate = this.files.some(f => 
      f.file.name === file.name && 
      f.file.size === file.size
    );
    
    if (isDuplicate) {
      alert(`File already selected: ${file.name}`);
      return false;
    }
    
    return true;
  }

  getFileType(file: File): 'image' | 'video' | 'zip' {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/zip') return 'zip';
    return 'image'; // default
  }

  createPreview(uploadFile: UploadFile): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadFile.preview = e.target?.result as string;
    };
    reader.readAsDataURL(uploadFile.file);
  }

  removeFile(index: number): void {
    if (this.files[index].uploading) {
      return; // Don't allow removal during upload
    }
    this.files.splice(index, 1);
  }

  nextStep(): void {
    if (this.files.length === 0) {
      alert('Please select at least one file before proceeding.');
      return;
    }

    if (this.currentStep === 1) {
      this.currentStep = 2;
    } else {
      // Proceed to upload
      this.uploadFiles();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  uploadFiles(): void {
    if (!this.isFormValid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Start upload simulation for all files
    this.files.forEach(file => {
      file.uploading = true;
      this.simulateUpload(file);
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getTotalSize(): string {
    const totalBytes = this.files.reduce((sum, file) => sum + file.file.size, 0);
    return this.formatFileSize(totalBytes);
  }

  get hasUploadingFiles(): boolean {
    return this.files.some(f => f.uploading);
  }

  get isFormValid(): boolean {
    return this.title.trim().length > 0 && 
           this.category.length > 0 && 
           !this.hasUploadingFiles;
  }

  get canProceed(): boolean {
    return this.files.length > 0 && !this.hasUploadingFiles;
  }

  private simulateUpload(uploadFile: UploadFile): void {
    const interval = setInterval(() => {
      uploadFile.progress += Math.random() * 15;
      
      if (uploadFile.progress >= 100) {
        uploadFile.progress = 100;
        uploadFile.uploading = false;
        clearInterval(interval);
        
        // Check if all files are done uploading
        if (this.files.every(f => !f.uploading)) {
          this.onUploadComplete();
        }
      }
    }, 200);
  }

  private onUploadComplete(): void {
    // Prepare upload data
    const uploadData = {
      files: this.files,
      metadata: {
        title: this.title,
        description: this.description,
        category: this.category,
        photographerName: this.photographerName,
        totalSize: this.getTotalSize(),
        uploadedAt: new Date().toISOString()
      }
    };

    // Emit the upload event
    this.filesUploaded.emit(uploadData);
    
    // Show success message
    alert('Files uploaded successfully!');
    
    // Close modal after a short delay
    setTimeout(() => {
      this.closeModal();
    }, 1500);
  }

  private resetForm(): void {
    this.files = [];
    this.title = '';
    this.description = '';
    this.category = '';
    this.photographerName = '';
    this.currentStep = 1;
    this.isDragOver = false;
  }
}