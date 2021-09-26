import { Component, OnInit } from '@angular/core';
import {StatusLabel} from "../shared/enums/status-label";
import {Status} from "../shared/enums/status";
import {DataService} from "../shared/services/data.service";
import {EmptyText} from "../shared/enums/empty-text";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  // inBacklog = 'Бэклог';
  // inProcess = 'В процессе';
  // inDone = 'Готово';
  // inBasket = 'Корзина';
  label = StatusLabel;
  status = Status;
  message = EmptyText
  tasks: any[] = [];
  get backlog() {
    return this.getTasks(this.status[0]);
  }
  get processing() {
    return this.getTasks(this.status[1]);
  }
  get done() {
    return this.getTasks(this.status[2]);
  }
  get basket() {
    return this.getTasks(this.status[3]);
  }

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.createTasks();
    this.tasks = this.dataService.getTasks();
  }

  getTasks(status: string): any[] {
    return this.tasks.filter(task => task.status === status)
  }

}