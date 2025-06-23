import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesSignal = signal<Category[]>([]);
  private loadingSignal = signal<boolean>(false);

  readonly categories = this.categoriesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.loadCategories().subscribe();
  }

  // Hook pattern: useCategories
  useCategories() {
    return {
      categories: this.categories,
      loading: this.loading,
      loadCategories: this.loadCategories.bind(this)
    };
  }

  loadCategories(): Observable<Category[]> {
    this.loadingSignal.set(true);
    
    return this.http.get<Category[]>(`${environment.api.baseUrl}/categories`)
      .pipe(
        tap(categories => {
          this.categoriesSignal.set(categories);
          this.loadingSignal.set(false);
        })
      );
  }
}