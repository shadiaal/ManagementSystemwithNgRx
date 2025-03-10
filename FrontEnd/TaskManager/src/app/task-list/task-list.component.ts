// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { selectAllTasks } from '../store/task.selectors';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
// import { RouterModule } from '@angular/router';
// import { loadTasks, deleteTask, Task, updateTask, addTask } from '../store/task.actions';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.css']
// })
// export class TaskListComponent implements OnInit {
//   tasksForm: FormGroup;
//   editForm: FormGroup;
//   tasks$: Observable<Task[]>;
//   taskToEdit: Task | null = null;

//   constructor(private fb: FormBuilder, private store: Store) {
//     // Form for adding new tasks
//     this.tasksForm = this.fb.group({
//       task: ['', Validators.required],
//     });

//     // Form for editing tasks
//     this.editForm = this.fb.group({
//       id: [''],
//       task: ['', Validators.required],
//     });

//     this.tasks$ = this.store.select(selectAllTasks);
//   }

//   ngOnInit(): void {
//     // Dispatch action to load tasks on init
//     this.store.dispatch(loadTasks());
//   }

//   // Submit new task
//   onSubmit(): void {
//     if (this.tasksForm.valid) {
//       const task = this.tasksForm.value.task;
//       this.store.dispatch(addTask({ task }));
//       this.tasksForm.reset();
//     }
//   }

//   // Edit task - populate the form with the task details
//   onEditTask(task: Task): void {
//     this.taskToEdit = task;
//     this.editForm.patchValue({
//       id: task.id,
//       task: task.task,
//     });
//   }

//   // Submit edited task
//   onEditSubmit(): void {
//     if (this.editForm.valid && this.taskToEdit) {
//       const updatedTask: Task = {
//         id: this.taskToEdit.id,
//         task: this.editForm.value.task,
//         completed: this.taskToEdit.completed
//       };
//       this.store.dispatch(updateTask({ task: updatedTask }));
//       this.editForm.reset();
//       this.taskToEdit = null;
//     }
//   }

 

//   // Delete task
//   onDeleteTask(id: number): void {
//     this.store.dispatch(deleteTask({ id }));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTasks } from '../store/task.selectors';
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
    // تحميل المهام عند بداية الـ Component
    this.store.dispatch(loadTasks());
  }

  onSubmit(): void {
    if (this.tasksForm.valid) {
      const task = this.tasksForm.value.task;
      const newTask: Task = {
        id: Date.now(),  // أو يمكنك استخدام UUID لإعطاء كل مهمة ID فريد
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

