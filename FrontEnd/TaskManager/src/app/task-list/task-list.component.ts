import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTasks} from '../store/task.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { loadTasks, deleteTask, Task, updateTask, addTask } from '../store/task.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  tasksForm: FormGroup;
  editForm: FormGroup;
  tasks$: Observable<Task[]>;
  taskToEdit: Task | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.tasksForm = this.fb.group({
      task: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      task: ['', Validators.required],
    });

    this.tasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  onSubmit(): void {
    if (this.tasksForm.valid) {
      const task = this.tasksForm.value.task;
      const newTask: Task = {
        id: Date.now(), 
        task,
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.tasksForm.reset();
    }
  }

  onEditTask(task: Task): void {
    this.taskToEdit = task;
    this.editForm.setValue({ task: task.task });
  }

  onEditSubmit(): void {
    if (this.editForm.valid && this.taskToEdit) {
      const updatedTask = { ...this.taskToEdit, task: this.editForm.value.task };
      this.store.dispatch(updateTask({ task: updatedTask }));
      this.taskToEdit = null;
      this.editForm.reset();
    }
  }

  onDeleteTask(id: number): void {
    this.store.dispatch(deleteTask({ id }));
  }

  cancelEdit(): void {
    this.taskToEdit = null;
    this.editForm.reset();
  }
}


