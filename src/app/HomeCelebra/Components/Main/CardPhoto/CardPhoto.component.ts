import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-photo',
  imports: [],
  templateUrl: './CardPhoto.component.html',
  styleUrl: './CardPhoto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPhotoComponent { }
