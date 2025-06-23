import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, CreatePostRequest } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // Signals
  private postsSignal = signal<Post[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private uploadingSignal = signal<boolean>(false);

  // Readonly signals
  readonly posts = this.postsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly uploading = this.uploadingSignal.asReadonly();

  constructor(private http: HttpClient) {}

  // Hook pattern: usePosts
  usePosts() {
    return {
      posts: this.posts,
      loading: this.loading,
      error: this.error,
      uploading: this.uploading,
      loadPosts: this.loadPosts.bind(this),
      loadMyPosts: this.loadMyPosts.bind(this),
      loadPendingPosts: this.loadPendingPosts.bind(this),
      loadApprovedPosts: this.loadApprovedPosts.bind(this),
      uploadPosts: this.uploadPosts.bind(this),
      updatePostStatus: this.updatePostStatus.bind(this),
      deletePost: this.deletePost.bind(this),
      clearError: this.clearError.bind(this)
    };
  }

  loadPosts(filters?: {
    estado?: string;
    usuario_id?: string;
    categoria_id?: string;
    limit?: number;
  }): Observable<Post[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    const params = new URLSearchParams();
    if (filters?.estado) params.append('estado', filters.estado);
    if (filters?.usuario_id) params.append('usuario_id', filters.usuario_id);
    if (filters?.categoria_id) params.append('categoria_id', filters.categoria_id);
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = `${environment.api.baseUrl}/posts${queryString ? '?' + queryString : ''}`;

    return this.http.get<Post[]>(url)
      .pipe(
        tap(posts => {
          this.postsSignal.set(posts);
          this.loadingSignal.set(false);
        }),
        catchError(error => {
          this.errorSignal.set(error.error?.message || 'Error cargando posts');
          this.loadingSignal.set(false);
          return of([]);
        })
      );
  }

  loadMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api.baseUrl}/posts/my-posts`)
      .pipe(
        tap(posts => this.postsSignal.set(posts))
      );
  }

  loadPendingPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api.baseUrl}/posts/pending`)
      .pipe(
        tap(posts => this.postsSignal.set(posts))
      );
  }

  loadApprovedPosts(): Observable<Post[]> {
    return this.loadPosts({ estado: 'aprobado' });
  }

  uploadPosts(files: File[], postData: CreatePostRequest): Observable<any> {
    this.uploadingSignal.set(true);
    this.errorSignal.set(null);

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    Object.keys(postData).forEach(key => {
      if (postData[key as keyof CreatePostRequest]) {
        formData.append(key, postData[key as keyof CreatePostRequest] as string);
      }
    });

    return this.http.post<any>(`${environment.api.baseUrl}/posts/upload`, formData)
      .pipe(
        tap(response => {
          this.uploadingSignal.set(false);
          // Recargar posts después de subir
          this.loadMyPosts().subscribe();
        }),
        catchError(error => {
          this.errorSignal.set(error.error?.message || 'Error subiendo archivos');
          this.uploadingSignal.set(false);
          return of(error);
        })
      );
  }

  updatePostStatus(postId: string, estado: 'pendiente' | 'aprobado' | 'rechazado'): Observable<any> {
    return this.http.patch(`${environment.api.baseUrl}/posts/${postId}/status`, { estado });
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${environment.api.baseUrl}/posts/${postId}`)
      .pipe(
        tap(() => {
          // Actualizar lista local
          const currentPosts = this.postsSignal();
          this.postsSignal.set(currentPosts.filter(p => p.id !== postId));
        })
      );
  }

  private clearError() {
    this.errorSignal.set(null);
  }
}