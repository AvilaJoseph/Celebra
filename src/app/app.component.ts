import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCelebraComponent } from "./HomeCelebra/HomeCelebra.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeCelebraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Celebra';
}
