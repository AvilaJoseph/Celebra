import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class MainComponent { }
