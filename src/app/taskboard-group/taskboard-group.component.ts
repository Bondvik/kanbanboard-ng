import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataService} from "../shared/services/data.service";

@Component({
  selector: 'app-taskboard-group',
  templateUrl: './taskboard-group.component.html',
  styleUrls: ['./taskboard-group.component.css']
})
export class TaskboardGroupComponent implements OnInit, AfterViewInit {
  @Input() statusLabel: string = '';
  @Input() status: string = '';
  @Input() tasks: any[] = [];
  @Input() isBasket = false;
  @Input() message: string = '';
  localTask: any = null;
  article: any = null;

  constructor(
    protected el: ElementRef,
    protected render: Renderer2,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.initTasksObserver();
  }

  ngAfterViewInit() {
    this.article = this.el.nativeElement.querySelector('.taskboard__group');
    this.render.setAttribute(this.article, 'data-status', this.status);
  }

  initTasksObserver() {
    this.dataService.observerTasks().subscribe(
      (data) => {
        this.tasks = data;
      }
    )
  }

  onEditClick(task: any) {
    this.localTask = Object.assign({}, task);
    this.dataService.updateTask(task, false);
  }

  onEscKeyDown(task: any, event: any) {
    if (['Escape', 'Esc'].includes(event.key)) {
      this.dataService.updateTask(this.localTask, true);
    }
    if (['Enter'].includes(event.key)) {
      this.dataService.updateTask(task, false);
    }
  }

  onDeleteClick() {
    const ids = this.tasks.map(({id}) => id);
    this.dataService.deleteTask(ids);
  }

  onTaskBoardGroupDragover(event: any) {
    event.preventDefault();
    //перетаскиваемый элемент
    const draggedElement = this.dataService.getDraggedElement();

    //тот элемент на который падает draggedElement (перетаскиваемый элемент)
    const droppedItem = event.target;

    //если событие произошло на том элементе, который мы перемещаем
    if (droppedItem === draggedElement) {
      return;
    }

    //находим referenceElement - элемент, ПЕРЕД которым будет вставлен
    //перемещаемый элемент draggedElement
    const referenceElement = (droppedItem === draggedElement.nextElementSibling) ?
      droppedItem.nextElementSibling : droppedItem;

    if (droppedItem.classList.contains('task')) {
      this.render.insertBefore(this.article.querySelector('.taskboard__list'), draggedElement, referenceElement);
    }

    //если в родительском листе нет ни одного целевого элемента (droppedItem)
    // if (this.tasks.length === 0) {
    //   this.render.appendChild(this.article.querySelector('.taskboard__list'), draggedElement);
    // }
  }

  onTaskDragstart(event: any) {
    event.target.classList.add('task--dragged');
    this.dataService.setDraggedElement(event.target);
  }

  onTaskDragend(event: any, task: any) {
    const draggedElement = this.dataService.getDraggedElement();
    //для обновления позиции в массиве задач
    const prevTaskId = event.target.previousElementSibling ?
      event.target.previousElementSibling.dataset.id : undefined;

    //для обновления статуса
    const newTaskStatus = draggedElement?.parentElement?.parentElement?.dataset?.status;
    if (newTaskStatus) {
      this.dataService.updateTaskStatus(task, newTaskStatus)
    }
    this.dataService.updatePosition(task, prevTaskId);

    this.dataService.setDraggedElement(null);
    event.target.classList.remove('task--dragged');
    delete task.prevTaskId;
  }
}
