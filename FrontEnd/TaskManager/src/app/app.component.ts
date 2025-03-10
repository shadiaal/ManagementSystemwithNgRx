import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{TaskListComponent} from'./task-list/task-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TaskListComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskManager';
}
