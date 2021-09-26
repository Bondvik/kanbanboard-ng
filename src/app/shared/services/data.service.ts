import { Injectable } from '@angular/core';
import {nanoid} from "nanoid";
import {Status} from "../enums/status";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly taskCount = 10;
  private status = Status;
  private tasks: any[] = [];
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

  constructor() { }

  getTasks() {
    return this.tasks;
  }

  private createTask() {
    return {
      id: nanoid(),
      title: this.titles[this.getRandomNumber(0, this.titles.length - 1)],
      status: this.status[this.getRandomNumber(0, 3)]
    }
  }

  createTasks() {
    this.tasks = new Array(10).fill('').map(() => this.createTask())
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
}
