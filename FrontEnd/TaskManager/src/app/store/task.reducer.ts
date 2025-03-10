import { createReducer, on } from '@ngrx/store';
import {Task} from './task.actions';
import { addTask, updateTask, deleteTask, loadTasks } from './task.actions';

export interface TaskState {
  tasks: Task[];
}
export const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t))
  })),
  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  on(loadTasks, state => ({
    ...state
  }))
);
