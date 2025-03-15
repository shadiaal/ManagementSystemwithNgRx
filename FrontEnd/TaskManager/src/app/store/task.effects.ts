import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
import { loadTasks, addTask, updateTask, deleteTask,loadTasksSuccess,loadTasksFailure } from './task.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}


  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => loadTasksSuccess({ tasks })), 
          catchError(error => of(loadTasksFailure({ error: 'loading failed' }))) 
        )
      )
    )
  );


  // Add New 
  addTask$ = createEffect(() =>this.actions$.pipe(ofType(addTask),mergeMap(action =>
        this.taskService.createTask(action.task).pipe(
          map(task => ({ type: '[Task] Add Task Success', task })),
          catchError(() => of({ type: '[Task] Add Task Failure' }))
        )
      )
    )
  );

   // Update
  updateTask$ = createEffect(() =>this.actions$.pipe(ofType(updateTask),mergeMap(action =>
        this.taskService.updateTask(action.task.id, action.task).pipe(
          map(task => ({ type: '[Task] Update Task Success', task })),
          catchError(() => of({ type: '[Task] Update Task Failure' }))
        )
      )
    )
  );

  // Delete
  deleteTask$ = createEffect(() =>this.actions$.pipe(ofType(deleteTask),mergeMap(action =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => ({ type: '[Task] Delete Task Success', id: action.id })),
          catchError(() => of({ type: '[Task] Delete Task Failure' }))
        )
      )
    )
  );
}


