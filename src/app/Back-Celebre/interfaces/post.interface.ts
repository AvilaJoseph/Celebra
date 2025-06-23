export interface Post {
  id: string;
  titulo: string;
  descripcion?: string;
  google_drive_url: string;
  google_drive_file_id?: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  fotografo?: string;
  metadata: {
    originalFileName: string;
    fileSize: number;
    mimeType: string;
  };
  usuario_id: string;
  categoria_id?: string;
  created_at: string;
  updated_at: string;
  usuario_nombre?: string;
  categoria_nombre?: string;
  categoria_color?: string;
  categoria_icono?: string;
}

export interface CreatePostRequest {
  titulo: string;
  descripcion?: string;
  fotografo?: string;
  categoria_id?: string;
}