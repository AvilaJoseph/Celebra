import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FiltrerPhotoComponent } from './FiltrerPhoto/FiltrerPhoto.component';

@Component({
  selector: 'Home-Celebra-Main',
  imports: [
    FiltrerPhotoComponent
  ],
  templateUrl: './Main.component.html',
  styleUrl: './Main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent { }
