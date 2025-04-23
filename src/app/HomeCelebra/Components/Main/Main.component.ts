import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListPhotoComponent } from "./ListPhoto/ListPhoto.component";

@Component({
  selector: 'Home-Celebra-Main',
  imports: [ListPhotoComponent],
  templateUrl: './Main.component.html',
  styleUrl: './Main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent { }
