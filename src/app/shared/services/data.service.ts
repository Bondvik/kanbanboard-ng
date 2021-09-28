import { Injectable } from '@angular/core';
import {nanoid} from "nanoid";
import {Status} from "../enums/status";
import {BehaviorSubject} from "rxjs";
import { map } from "rxjs/operators"
import {Task} from "../intefaces/task";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private needUpdateNotify$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public updateNotifyer$ = this.needUpdateNotify$.asObservable();
  private readonly taskCount = 10;
  private status = Status;
  private tasks: Task[] = [];
  titles: string[] = [
    'Купить корм',
    'Сделать домашку',
    'Защитить проект',
    'Погладить кота',
    'Выучить JS',
    'Выпить смузи',
    'Выучить Angular',
    'Сделать канбан-доску',
    'Позвонить бабушке'
  ];
  draggedElement: any = null;

  constructor() { }

  observerTasks() {
    return this.updateNotifyer$.pipe(
      map(() => this.tasks)
    )
  }

  private createTask(): Task {
    return {
      id: nanoid(),
      title: this.titles[this.getRandomNumber(0, this.titles.length - 1)],
      status: this.status[this.getRandomNumber(0, 3)],
      isDisabled: true
    }
  }

  createTasks() {
    this.tasks = new Array(this.taskCount).fill('').map(() => this.createTask());
  }

  private getRandomNumber (min: number, max: number): number {
    let minValue =  Math.ceil(min);
    let maxValue = Math.floor(max);
    if (min < 0 || max < 0) {
      throw new Error('Must be positive number')
    }
    if (min === max) {
      return min;
    }
    if (min > max) {
      minValue = Math.ceil(max);
      maxValue = Math.floor(min);
    }
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  };

  addTask(title: string) {
    const update: Task = {
      id: nanoid(),
      title,
      status: this.status[0],
      isDisabled: true
    }
    this.tasks.push(update);
  }

  updateTask(update: Task, restore: boolean = false) {
    for (let task of this.tasks) {
      if (task.id === update.id) {
        if (restore) {
          task.title = update.title;
        }
        task.isDisabled = !task.isDisabled
      } else {
        task.isDisabled = true;
      }
    }
    this.needUpdateNotify$.next('')
  }

  updateTaskStatus(update: Task, statusAfterDrop: string) {
    for (let task of this.tasks) {
      if (task.id === update.id) {
        task.status = statusAfterDrop
      }
    }
    this.needUpdateNotify$.next('')
  }

  deleteTask() {
    this.tasks = this.tasks.filter((task) => task.status !== this.status[3])
    this.needUpdateNotify$.next('');
  }

  setDraggedElement(taskElement: any) {
    this.draggedElement = taskElement;
  }

  getDraggedElement(): any {
    return this.draggedElement;
  }

  updatePosition(update: Task, prevTaskId: string | undefined) {
    const taskIndex = this.getTaskIndexByID(update.id);

    this.tasks.splice(taskIndex, 1);
    if (prevTaskId !== undefined) {
      const prevTaskIndex = this.tasks.findIndex((el) => el.id === prevTaskId);
      this.tasks.splice(prevTaskIndex + 1, 0, update);
    } else {
      this.tasks.unshift(update);
    }

    this.needUpdateNotify$.next('');
  }

  private getTaskIndexByID(id: string): number {
    return this.tasks.findIndex((el) => el.id === id);
  }
}
